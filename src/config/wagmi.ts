import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";

export const web3AuthConnector = Web3AuthConnectorInstance([scrollSepolia]);

export const config = createConfig({
  chains: [scrollSepolia],
  connectors: [web3AuthConnector],
  transports: {
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io"),
  },
});
