"use client";

import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUnion } from "@/context/UnionContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useCivilRegistryContract } from "@/hooks/useContract";
export default function ProposalSummaryComponent({ isWife = false }) {
  const router = useRouter();
  const { vows, selectedNoggle, eternalToken } = useUnion();
  const { proposeUnion } = useCivilRegistryContract();
  const { acceptUnion } = useCivilRegistryContract();
  const { unionId } = useParams();
  useEffect(() => {
    if (!selectedNoggle || !vows) {
      router.push("/noggles");
    }
  }, [selectedNoggle, vows]);

  return (
    <div className="min-h-screen bg-[#f8f3f3] px-4 py-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="flex">
              <div className="w-8 h-8 bg-black"></div>
              <div className="w-8 h-8 bg-pink-500"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black bg-white"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-300"></div>
          </div>
        </Link>
        <h1 className="font-mono text-xl font-bold">Crafting a Union</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto mt-16">
        {/* Pixel Art Card */}
        <div className="relative p-8 border-4 border-black bg-white min-h-[400px] flex flex-col">
          {/* Decorative Border Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black -translate-x-4 -translate-y-4"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black -translate-x-4 translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black translate-x-4 translate-y-4"></div>

          {/* Content */}
          <div className="space-y-8 flex-1 flex flex-col">
            <div>
              <div className="whitespace-pre-wrap">{vows}</div>
              <div className="mx-auto w-64 mt-4 h-48 border-4 border-black flex items-center justify-center ">
                <Image
                  src={`/noggles/noogles-${selectedNoggle}.png`}
                  alt={`Noggle ${selectedNoggle}`}
                  width={256}
                  height={256}
                />
              </div>
            </div>
            {/* Bottom text with separator */}
            <div className="space-y-4">
              <div className="border-t-2 border-gray-200"></div>
              <p className="text-zinc-600 font-mono text-sm">
                Take a moment to review your proposal. Make sure your vows and
                nougles selection are just right. If you need to make any
                changes, you can edit your vows or choose a different noggles.
                Once you’re happy with everything, click Create Eternal Token →
                to proceed.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="bg-red-500 text-white"
            onClick={() => {
              if (isWife) {
                if (!eternalToken) {
                  router.push(`/${unionId}/eternal`);
                }
                acceptUnion
                  .mutateAsync({
                    unionid: parseInt(unionId as string),
                    tokenId: selectedNoggle!,
                    vow: vows,
                    message: eternalToken,
                  })
                  .then(() => {
                    router.push(`/${unionId}/proposal-done`);
                  });
              } else {
                router.push(`/eternal`);
              }
            }}
          >
            Create Eternal Token
          </Button>
        </div>
      </main>
    </div>
  );
}
