"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUnion } from "@/context/UnionContext";

export default function NooglesPageComponent({ isWife = false }) {
  const router = useRouter();
  const { selectedNoggle, setSelectedNoggle } = useUnion();
  const { unionId } = useParams();
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
              Choose your perfect half-of-Nougles!{" "}
            </h2>

            {/* Center content vertically */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Grid of noggles */}
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    onClick={() => setSelectedNoggle(id)}
                    className={`cursor-pointer p-4 border-4 transition-colors ${
                      selectedNoggle === id ? "border-red-500" : "border-black"
                    }`}
                  >
                    <div className="w-48 h-32 flex items-center justify-center">
                      <Image
                        src={`/noggles/noogles-${id}.png`}
                        alt={`Noggle ${id}`}
                        width={256}
                        height={256}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom text with separator */}
            <div className="space-y-4">
              <div className="border-t-2 border-gray-200"></div>
              <p className="text-zinc-600 font-mono text-sm">
                It’s time to get creative! Choose your half of the sunglasses
                that will represent you in this union. Your partner will pick
                the other half, and together, you’ll craft a unique and
                meaningful pair!{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => router.push(isWife ? `/${unionId}/vows` : "/vows")}
            className="w-1/3 ml-auto"
          >
            Craft your vows
          </Button>
        </div>
      </main>
    </div>
  );
}
