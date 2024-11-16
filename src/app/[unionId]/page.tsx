"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSubgraph } from "@/hooks/useSubgraph";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UnionCertificatePage() {
  const unionId = useParams().unionId;
  const { useUnionById } = useSubgraph();
  const union = useUnionById(unionId[0]);

  console.log("union", union.data);
  return (
    <div className="min-h-screen bg-[#f8f3f3] px-4 py-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
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
        <h1 className="font-mono text-xl font-bold">Union Certificate</h1>
        <Button
          variant="secondary"
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Connect Wallet
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto">
        <Card className="relative p-8 border-4 border-black bg-white">
          {/* Decorative Border Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black -translate-x-4 -translate-y-4"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black -translate-x-4 translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black translate-x-4 translate-y-4"></div>

          {/* Certificate Content */}
          <div className="space-y-8 font-mono">
            {/* Better Half Section */}
            <div>
              <h2 className="text-lg font-bold border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                The Better Half <span className="text-red-500">❤️</span>
              </h2>
              <div className="space-y-4">
                <p className="whitespace-pre-wrap">
                  {union?.data.unionProposeds[0].union.vows}
                </p>
              </div>
            </div>

            {/* Other Half Section */}
            <div>
              <h2 className="text-lg font-bold border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                The Other Half <span className="text-red-500">❤️</span>
              </h2>
              <p>They'll Get to It… Eventually</p>
            </div>

            {/* Perfect Pair Section */}
            <div>
              <h2 className="text-lg font-bold border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                A Perfect Pair <span>💝</span>
              </h2>
              <div className="flex justify-center my-4">
                <div className="relative border-4 border-black p-4 w-64 h-32">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="Union NFT Preview"
                    width={200}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-center">Still Waiting to Complete the Look!</p>
            </div>

            {/* Signature Section */}
            <div>
              <h2 className="text-lg font-bold border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
                Signed with Love ✍️
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-2">Signed by</p>
                  <p className="font-bold flex items-center gap-2">
                    The Better Half <span className="text-red-500">❤️</span>
                  </p>
                  <p className="text-sm text-zinc-600 font-mono mt-2">
                    Wallet address
                    <br />
                    0xD9845...07d34
                  </p>
                </div>
                <div>
                  <p className="mb-2">Awaiting signature by</p>
                  <p className="font-bold flex items-center gap-2">
                    The Other Half <span className="text-red-500">❤️</span>
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white mt-2">
                    Connect Wallet to Sign
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="text-center border-t-2 border-black pt-4 mt-8">
              <p className="text-sm text-zinc-600">
                Connected hearts, eternal promises. 💕
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer Buttons */}
      <footer className="max-w-3xl mx-auto mt-6 flex justify-between">
        <Button
          variant="secondary"
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Copy Certificate Link
        </Button>
        <Button
          variant="secondary"
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          View Contract Details <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}
