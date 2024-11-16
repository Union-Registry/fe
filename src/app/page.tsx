"use client";

import {
  IProvider,
  WEB3AUTH_NETWORK,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth } from "@web3auth/modal";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://eth-sepolia.api.onfinality.io/public",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  console.log("walletAddress", walletAddress);
  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        setIsLoading(true);

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          chainConfig,
          privateKeyProvider,
          uiConfig: {
            loginMethodsOrder: ["google", "facebook"],
            defaultLanguage: "en",
          },
        });

        // Get adapters for external wallets
        const adapters = await getDefaultExternalAdapters({
          options: {
            clientId,
            web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
            chainConfig,
            privateKeyProvider,
          },
        });

        // Configure the adapters
        adapters.forEach((adapter) => {
          web3authInstance.configureAdapter(adapter);
        });

        try {
          await web3authInstance.initModal({
            modalConfig: {
              [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
                label: "wallet_connect",
                showOnModal: true,
                walletConnectInitOptions: {
                  projectId: walletConnectProjectId,
                  chains: ["0xaa36a7"], // Sepolia chainId
                  optionalChains: ["0xaa36a7"],
                  metadata: {
                    name: "Union Registry",
                    description: "Craft a Union, Piece by Piece",
                    url: "https://unionregistry.xyz",
                    icons: ["https://web3auth.io/images/w3a-L-Favicon-1.svg"],
                  },
                },
              },
            },
          });
          console.log("Modal initialized successfully");
        } catch (modalError) {
          console.error("Error initializing modal:", modalError);
          throw modalError;
        }

        if (web3authInstance.connected) {
          setProvider(web3authInstance.provider);
          setLoggedIn(true);
        }

        setWeb3auth(web3authInstance);
        setError(null);
      } catch (err) {
        console.error("Error during initialization:", err);
        setError(
          err instanceof Error
            ? `Failed to initialize Web3Auth: ${err.message}`
            : "Failed to initialize Web3Auth"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initWeb3Auth();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      if (provider && loggedIn) {
        try {
          const address = await getAccounts();
          console.log("Address from useEffect:", address);
          setWalletAddress(address);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    };

    fetchAddress();
  }, [provider, loggedIn]);

  const login = async () => {
    if (!web3auth) {
      setError("Web3Auth not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);

      setError(null);
    } catch (err) {
      console.error("Error during login:", err);
      setError(
        err instanceof Error ? `Login failed: ${err.message}` : "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      setError("Web3Auth not initialized");
      return;
    }
    try {
      setIsLoading(true);
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setWalletAddress(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to logout");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      setError("Web3Auth not initialized");
      return;
    }
    try {
      const user = await web3auth.getUserInfo();
      console.log("user", user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get user info");
      console.error(err);
    }
  };

  const handleRPCCall = async (
    operation: (provider: IProvider) => Promise<any>,
    errorMessage: string
  ) => {
    if (!provider) {
      setError("Provider not initialized");
      return;
    }
    try {
      const result = await operation(provider);
      console.log(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessage);
      console.error(err);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      setError("Provider not initialized");
      return;
    }
    try {
      // First try with eth_accounts
      const accounts = await provider.request({
        method: "eth_accounts",
      });

      // If eth_accounts doesn't work, try with personal_accounts
      if (!accounts || accounts.length === 0) {
        const personalAccounts = await provider.request({
          method: "personal_accounts",
        });
        return personalAccounts[0];
      }

      return accounts[0];
    } catch (error) {
      console.error("Error getting accounts:", error);
      // Try alternative method using eth_requestAccounts
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        return accounts[0];
      } catch (secondError) {
        console.error("Error with alternative method:", secondError);
        throw secondError;
      }
    }
  };

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  // if (error) {
  //   return (
  //     <div className="container">
  //       <div className="error">Error: {error}</div>
  //       {!web3auth && (
  //         <button onClick={() => window.location.reload()} className="card">
  //           Retry
  //         </button>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#f8f3f3] px-4 py-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black"></div>
          <div className="w-8 h-8 bg-pink-500"></div>
          <span className="font-mono font-bold">Union Registry</span>
        </div>
        <div className="flex items-center gap-4">
          {walletAddress && (
            <span className="font-mono text-sm">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
          )}
          <Button
            variant="secondary"
            className="bg-zinc-800 text-white hover:bg-zinc-700"
            onClick={loggedIn ? logout : login}
          >
            {loggedIn ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto text-center mt-16 space-y-12">
        <div className="space-y-4">
          <h1 className="font-mono text-2xl font-bold">
            Craft a Union, Piece by Piece
          </h1>
          <p className="text-zinc-600">
            Bring your story to life by creating something unique—together.
          </p>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white font-mono"
            onClick={() => {
              if (!loggedIn) {
                login();
              }
            }}
            asChild
          >
            <Link href={loggedIn ? "/verify" : "#"}>Craft a Union →</Link>
          </Button>
        </div>

        {/* Pixel Art Card */}
        <div className="relative p-8 border-4 border-black bg-white">
          {/* Decorative Border Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black -translate-x-4 -translate-y-4"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black -translate-x-4 translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black translate-x-4 translate-y-4"></div>

          {/* Heart Icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 bg-pink-500"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 pt-4">
            <h2 className="font-mono text-2xl font-bold">
              Welcome to Union Registry!
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto">
              Here, you and your special someone can craft unique half-and-half
              sunglasses and immortalize your union with fun, on-chain
              attestations.
            </p>
            <div className="space-y-2">
              <p className="text-zinc-600">No paperwork, no hassle</p>
              <p className="text-zinc-600">just pure creativity,</p>
              <p className="text-zinc-600">love!</p>
            </div>

            {/* Decorative Elements */}
            <div className="relative h-16">
              <div className="absolute left-8 top-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Sunglasses icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute right-8 top-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Pizza icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute right-16 bottom-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Music note"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute left-16 bottom-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Rose icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
            </div>

            <Button className="bg-pink-500 hover:bg-pink-600 text-white font-mono">
              Let's Craft a Union →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
