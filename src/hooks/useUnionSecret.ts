import { useQuery } from "@tanstack/react-query";
import { useCivilRegistryContract } from "./useContract";

export const useUnionSecret = (unionId: number) => {
  const { contract } = useCivilRegistryContract();
  return useQuery({
    queryKey: ["unionSecret", unionId],
    queryFn: async () => {
      const union = (await contract.read.unions([unionId])) as string[];
      if (union) {
        return union[0];
      } else {
        return "";
      }
    },
  });
};
