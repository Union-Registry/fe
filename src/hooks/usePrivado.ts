import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { lineaSepolia } from "viem/chains";
import { useAccount } from "wagmi";

const contractAddress = "0xa43E985D7b5b66F4C2E172C92032A4Ad7d230652";
const requestId = 101;

export const usePrivadoChainStatus = () => {
  const { address } = useAccount();
  const publicClient = createPublicClient({
    chain: lineaSepolia,
    transport: http(),
  });
  return useQuery({
    queryKey: ["isPrivadoVerified", address],
    enabled: !!address,
    queryFn: async () => {
      console.log("get privado state onchain");
      const abi = [
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint64", name: "requestId", type: "uint64" },
          ],
          name: "isProofVerified",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
      ];

      return await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "isProofVerified",
        args: [address, requestId],
      });
    },
    staleTime: 10 * 1000, // Refetch every 10 seconds
  });
};
