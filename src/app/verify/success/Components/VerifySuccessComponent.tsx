"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function VerifySuccessPageComponent({ isWife = false }) {
  const { address: walletAddress } = useAccount();
  const { unionId } = useParams();

  console.log("walletAddressV", walletAddress);
  const router = useRouter();

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
            <h2 className="font-mono text-2xl font-bold">Well Done!</h2>

            {/* Center button vertically */}
            <div className="flex-1 flex items-center justify-center font-bold">
              You’re Verified!
            </div>
            <div className="">
              Great job, human! You’ve successfully proven your humanity. Now
              you’re all set to craft your union.
            </div>

            {/* Bottom text with separator */}
            <div className="space-y-4">
              <div className="border-t-2 border-gray-200"></div>
              <p className="text-zinc-600 font-mono text-sm">
                We promise this will only take a moment! We&apos;re using
                Privado to make sure you&apos;re human (and not a robot).
                It&apos;s quick, secure, and one-time only!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() =>
              router.push(isWife ? `/${unionId}/noggles` : "/noggles")
            }
            className="w-1/3 ml-auto"
          >
            Dive Into the Fun
          </Button>
        </div>
      </main>
    </div>
  );
}
