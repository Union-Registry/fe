"use client";

import { CIVIL_REGISTRY_CONTRACT } from "@/config/contracts";
import { CivilRegistryAbi } from "@/lib/abi";
import { getContract, toHex } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import { keccak256 } from "viem";

export const useCivilRegistryContract = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();

  const contract = getContract({
    address: CIVIL_REGISTRY_CONTRACT,
    abi: CivilRegistryAbi,
    client: walletClient?.data as any,
  });

  const proposeUnion = async (
    tokenId: number,
    vow: string,
    message: string
  ) => {
    const secretHash = keccak256(toHex(message));
    const tx = await contract.write.proposeUnion([tokenId, vow, secretHash]);
    await publicClient!.waitForTransactionReceipt({ hash: tx! });
  };

  const acceptUnion = async (
    unionid: number,
    tokenId: number,
    vow: string,
    message: string
  ) => {
    const tx = await contract.write.acceptUnion([
      unionid,
      tokenId,
      vow,
      message,
    ]);
    await publicClient!.waitForTransactionReceipt({ hash: tx! });
  };

  return {
    proposeUnion,
    acceptUnion,
  };
};
