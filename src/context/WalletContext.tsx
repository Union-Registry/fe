"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  IProvider,
  WEB3AUTH_NETWORK,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { scrollSepolia } from "viem/chains";

interface WalletContextType {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: scrollSepolia.id,
  rpcTarget: "https://sepolia-rpc.scroll.io",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://scroll-sepolia.blockscout.com",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchWalletAddress = async (provider: IProvider) => {
    try {
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[];

      if (accounts && accounts[0]) {
        setWalletAddress(accounts[0]);
        return;
      }

      const personalAccounts = (await provider.request({
        method: "personal_accounts",
      })) as string[];

      if (personalAccounts && personalAccounts[0]) {
        setWalletAddress(personalAccounts[0]);
        return;
      }

      const requestedAccounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (requestedAccounts && requestedAccounts[0]) {
        setWalletAddress(requestedAccounts[0]);
      }
    } catch (error) {
      console.error("Error fetching wallet address:", error);
      setWalletAddress(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
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

        const adapters = await getDefaultExternalAdapters({
          options: {
            clientId,
            web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
            chainConfig,
            privateKeyProvider,
          },
        });

        adapters.forEach((adapter) => {
          web3authInstance.configureAdapter(adapter);
        });

        await web3authInstance.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: "wallet_connect",
              showOnModal: true,
              options: {
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

        if (web3authInstance.connected) {
          setProvider(web3authInstance.provider);
          setIsLoggedIn(true);
          if (web3authInstance.provider) {
            await fetchWalletAddress(web3authInstance.provider);
          }
        }

        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setIsLoggedIn(true);
      if (web3authProvider) {
        await fetchWalletAddress(web3authProvider);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    try {
      setIsLoading(true);
      await web3auth.logout();
      setProvider(null);
      setIsLoggedIn(false);
      setWalletAddress(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        isLoading,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// export function useWallet() {
//   const context = useContext(WalletContext);
//   if (context === undefined) {
//     throw new Error("useWallet must be used within a WalletProvider");
//   }
//   return context;
// }
