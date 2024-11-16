import { useAccount } from "wagmi";
import { gql, request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

const graphQlUrl =
  "https://api.studio.thegraph.com/query/48819/union-registry-2/version/latest";
export const useSubgraph = () => {
  const { address } = useAccount();

  const unionProposedQuery = gql`
    query ($sender: String!) {
      unionProposeds(where: { sender: $sender }) {
        unionId
        transactionHash
      }
    }
  `;
  const proposedUnions = useQuery({
    queryKey: ["unionProposeds", address],
    staleTime: 10 * 1000,
    queryFn: async () => {
      const result = await request({
        url: graphQlUrl,
        document: unionProposedQuery,
        variables: { sender: address?.toLowerCase() },
      });
      return result;
    },
    enabled: !!address,
  });

  return {
    proposedUnions,
  };
};
