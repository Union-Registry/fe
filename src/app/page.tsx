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
import RPC from "./rpcs/viemRpcs";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
console.log("walletConnectProjectId", walletConnectProjectId);
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
                  projectId: walletConnectProjectId as string,
                  chains: ["0xaa36a7"], // Sepolia chainId
                  optionalChains: ["0xaa36a7"],
                  metadata: {
                    name: "Web3Auth",
                    description: "Web3Auth x WalletConnect",
                    url: "https://web3auth.io",
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
      console.log(user);
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

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
        {!web3auth && (
          <button onClick={() => window.location.reload()} className="card">
            Retry
          </button>
        )}
      </div>
    );
  }

  const loggedInView = (
    <div className="flex-container">
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button
        onClick={() => handleRPCCall(RPC.getAccounts, "Failed to get accounts")}
        className="card"
      >
        Get Accounts
      </button>
      <button
        onClick={() => handleRPCCall(RPC.getBalance, "Failed to get balance")}
        className="card"
      >
        Get Balance
      </button>
      <button
        onClick={() => handleRPCCall(RPC.signMessage, "Failed to sign message")}
        className="card"
      >
        Sign Message
      </button>
      <button
        onClick={() =>
          handleRPCCall(RPC.sendTransaction, "Failed to send transaction")
        }
        className="card"
      >
        Send Transaction
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a
          target="_blank"
          href="https://web3auth.io/docs/sdk/pnp/web/modal"
          rel="noreferrer"
        >
          Web3Auth
        </a>
        & NextJS Implementation
      </h1>

      <div className="grid">
        {loggedIn ? (
          loggedInView
        ) : (
          <button onClick={login} className="card">
            Login
          </button>
        )}
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default App;
