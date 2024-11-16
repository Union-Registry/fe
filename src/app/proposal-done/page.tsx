"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUnion } from "@/context/UnionContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useCivilRegistryContract } from "@/hooks/useContract";
import { Input } from "@/components/ui/input";
import { useSubgraph } from "@/hooks/useSubgraph";
export default function EternalPage() {
  const router = useRouter();
  const { vows, selectedNoggle, eternalToken, setEternalToken } = useUnion();
  const { proposeUnion } = useCivilRegistryContract();
  useEffect(() => {
    if (!selectedNoggle || !vows) {
      router.push("/noggles");
    }
  }, [selectedNoggle, vows]);

  const { proposedUnions } = useSubgraph();
  const lastUnion = proposedUnions.data?.unionProposeds.reduce(
    (prev, current) => {
      return Number(prev.unionId) > Number(current.unionId) ? prev : current;
    }
  );

  console.log("lastUnion", lastUnion);

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
            <h1 className="text-2xl font-bold">Your Proposal is Live! 🎉</h1>
            <div className="space-y-4 text-sm">
              <p className="text-center">
                Share this link with the other half ❤️ to accept the union.
              </p>
              <p className="text-center">
                <Link href={`https://eternal.noogles.xyz/${eternalToken}`}>
                  https://eternal.noogles.xyz/{eternalToken}
                </Link>
              </p>
              <div>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="bg-black text-white"
                    onClick={() => {
                      window.open(
                        `https://blockscout.noogles.xyz/tx/${eternalToken}`,
                        "_blank"
                      );
                    }}
                  >
                    Link to Blockscout
                  </Button>
                  <Button
                    className="bg-black text-white"
                    onClick={() => {
                      window.open(
                        `https://eternal.noogles.xyz/${eternalToken}`,
                        "_blank"
                      );
                    }}
                  >
                    View Union
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://eternal.noogles.xyz/${eternalToken}`
                      );
                    }}
                  >
                    Share The Love
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-t-2 border-gray-200"></div>
                <p className="text-zinc-600 font-mono text-sm">
                  Way to go! Your proposal is now sealed and ready to share with
                  your special someone. Copy the link below to send them, or
                  open it yourself to admire your masterpiece!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="bg-red-500 text-white"
            onClick={async () =>
              await proposeUnion
                .mutateAsync({
                  tokenId: selectedNoggle,
                  vow: vows,
                  message: "I love you",
                })
                .then(() => {
                  router.push("/proposal-summary");
                })
            }
          >
            Seal the Deal
          </Button>
        </div>
      </main>
    </div>
  );
}
