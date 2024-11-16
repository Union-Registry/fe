"use client";

import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUnion } from "@/context/UnionContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useCivilRegistryContract } from "@/hooks/useContract";
import ProposalSummaryComponent from "./components/ProposalSummaryComponent";
export default function ProposalSummaryPage() {
  return <ProposalSummaryComponent />;
}
