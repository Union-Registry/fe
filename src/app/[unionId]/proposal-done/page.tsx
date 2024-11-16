"use client";

import ProposalDoneComponent from "@/app/proposal-done/components/ProposalDoneComponent";
import { useParams } from "next/navigation";

export default function ProposalDonePage() {
  const unionId = useParams().unionId as string;
  return <ProposalDoneComponent isWife={true} unionId={unionId} />;
}
