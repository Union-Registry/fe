"use client";

import { useEffect, useState } from "react";
import ProposalDoneComponent from "./components/ProposalDoneComponent";
import { useCivilRegistryContract } from "@/hooks/useContract";
import { usePublicClient, useTransaction } from "wagmi";
import { Address } from "viem";

export default function ProposalDonePage() {
  return <ProposalDoneComponent />;
}
