"use client";

import { CIVIL_REGISTRY_CONTRACT } from "@/config/contracts";
import { CivilRegistryAbi } from "@/lib/abi";
import { getContract, toHex } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import { keccak256 } from "viem";
import { useMutation } from "@tanstack/react-query";

export const useCivilRegistryContract = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();

  const contract = getContract({
    address: CIVIL_REGISTRY_CONTRACT,
    abi: CivilRegistryAbi,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    client: walletClient?.data!,
  });

  const proposeUnion = useMutation({
    mutationFn: async ({
      tokenId,
      vow,
      message,
    }: {
      tokenId: number;
      vow: string;
      message: string;
    }): Promise<void> => {
      const secretHash = keccak256(toHex(message));
      const tx = await contract.write.proposeUnion([tokenId, vow, secretHash]);
      await publicClient!.waitForTransactionReceipt({ hash: tx! });
    },
  });

  const acceptUnion = useMutation({
    mutationFn: async ({
      unionid,
      tokenId,
      vow,
      message,
    }: {
      unionid: number;
      tokenId: number;
      vow: string;
      message: string;
    }): Promise<void> => {
      const tx = await contract.write.acceptUnion([
        unionid,
        tokenId,
        vow,
        message,
      ]);
      await publicClient!.waitForTransactionReceipt({ hash: tx! });
    },
  });

  return {
    proposeUnion,
    acceptUnion,
  };
};
