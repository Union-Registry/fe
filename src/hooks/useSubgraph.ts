import { useAccount } from "wagmi";
import { gql, request } from "graphql-request";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";

interface UnionProposed {
  unionId: string;
  transactionHash: string;
  union: {
    participants: string[];
    vows: string[];
    ringIds: string[];
    accepted: boolean;
    attestationUid: string;
  };
}

interface UnionByIdResult {
  unionProposeds: UnionProposed[];
}

const graphQlUrl =
  "https://api.studio.thegraph.com/query/8787/union-registry-2/version/latest";

export const useSubgraph = () => {
  const { address } = useAccount();

  const unionProposedQuery = gql`
    query ($sender: String!) {
      unionProposeds(where: { sender: $sender }) {
        unionId
        transactionHash
        union {
          participants
          vows
          ringIds
          accepted
          attestationUid
        }
      }
    }
  `;

  const unionByIdQuery = gql`
    query ($unionId: Int!) {
      unionProposeds(where: { unionId: $unionId }) {
        unionId
        transactionHash
        union {
          participants
          vows
          ringIds
          accepted
          attestationUid
        }
      }
    }
  `;

  const proposedUnions: QueryObserverResult<
    { unionProposeds: UnionProposed[] },
    unknown
  > = useQuery({
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

  const useUnionById = (unionId: string) => {
    return useQuery<UnionByIdResult>({
      queryKey: ["union", unionId],
      staleTime: 10 * 1000,
      queryFn: async () => {
        const result = await request<UnionByIdResult>({
          url: graphQlUrl,
          document: unionByIdQuery,
          variables: { unionId: Number(unionId) },
        });
        return result;
      },
      enabled: !!unionId,
    });
  };

  return {
    proposedUnions,
    useUnionById,
  };
};
