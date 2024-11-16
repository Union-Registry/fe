"use client";

import { Button } from "@/components/ui/button";
import { usePrivadoChainStatus } from "@/hooks/usePrivado";
import { PrivadoUrl } from "@/lib/privado";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
  const privadoChain = usePrivadoChainStatus();
  const [isOpened, setIsOpened] = useState(false);
  console.log("privadoChainStatus", privadoChain.data);
  const router = useRouter();

  useEffect(() => {
    if (privadoChain.data === true) {
      router.push("/verify/success");
    }
  }, [privadoChain.data]);

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
            <h2 className="font-mono text-2xl font-bold">
              Just a Quick Human Check!
            </h2>

            {/* Center button vertically */}
            <div className="flex-1 flex items-center justify-center">
              <Button
                className={`${
                  isOpened
                    ? "bg-black hover:bg-zinc-800"
                    : "bg-[#d53c5e] hover:bg-[#af1638]"
                } text-white font-mono px-8 py-6 text-lg`}
                onClick={() => {
                  if (!isOpened) {
                    setIsOpened(true);
                    window.open(PrivadoUrl, "_blank");
                  }
                  privadoChain.refetch();
                }}
              >
                {isOpened ? "See If I’m Verified" : "Let's Do This →"}
              </Button>
            </div>

            {/* Bottom text with separator */}
            <div className="space-y-4">
              <div className="border-t-2 border-gray-200"></div>
              <p className="text-zinc-600 font-mono text-sm">
                We promise this will only take a moment! We're using Privado to
                make sure you're human (and not a robot). It's quick, secure,
                and one-time only!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
