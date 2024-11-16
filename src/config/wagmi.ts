import { http, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";

export const config = createConfig({
  chains: [scrollSepolia],
  connectors: [Web3AuthConnectorInstance([scrollSepolia])],
  transports: {
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io"),
  },
});
