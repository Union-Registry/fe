"use client";

import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUnion } from "@/context/UnionContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useCivilRegistryContract } from "@/hooks/useContract";
import { Input } from "@/components/ui/input";
export default function EternalPage() {
  const router = useRouter();
  const { vows, selectedNoggle, eternalToken, setEternalToken } = useUnion();
  const { proposeUnion } = useCivilRegistryContract();
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
            <h1 className="text-2xl font-bold">Create your Eternal Token</h1>
            <div className="space-y-2">
              <label className="font-mono text-sm">Eternal Token</label>
              <Input
                className="border-black"
                value={eternalToken}
                onChange={(e) => {
                  // Remove spaces and only allow alphanumeric + symbols
                  const sanitized = e.target.value.replace(/\s+/g, "");
                  setEternalToken(sanitized);
                }}
                placeholder="Enter something meaningful (no spaces)"
              />
              <div className="flex flex-center text-xs text-zinc-600">
                Only letters, numbers, or symbols. No spaces allowed.
              </div>
            </div>
            {/* Bottom text with separator */}
            <div className="space-y-4">
              <div className="border-t-2 border-gray-200"></div>
              <p className="text-zinc-600 font-mono text-sm">
                Your Eternal Token is a unique key that seals your proposal
                forever. Enter something meaningful, like a special date, a
                word, or even an inside joke, and we’ll create a magical link
                just for you.
              </p>
              <p className="text-zinc-600 font-mono text-sm">
                Your Eternal Token is unique and essential—it’s the key to your
                proposal’s magic. Don’t lose it, and make sure to save it
                somewhere safe!{" "}
              </p>
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
                  router.push("/proposal-done");
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
