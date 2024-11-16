"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  // const { walletAddress, isLoading, login, logout, isLoggedIn } = useWallet();

  const { address: walletAddress, isConnected: isLoggedIn } = useAccount();
  const { connect: login, connectors } = useConnect();
  const { disconnectAsync: logout } = useDisconnect();

  return (
    <div className="min-h-screen bg-[#f8f3f3] px-4 py-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black"></div>
          <div className="w-8 h-8 bg-pink-500"></div>
          <span className="font-mono font-bold">Union Registry</span>
        </div>
        <div className="flex items-center gap-4">
          {walletAddress && (
            <span className="font-mono text-sm">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
          )}
          <Button
            variant="secondary"
            className="bg-zinc-800 text-white hover:bg-zinc-700"
            onClick={async () => {
              if (isLoggedIn) {
                await logout();
              } else {
                login({
                  connector: connectors[0],
                });
              }
            }}
          >
            {isLoggedIn ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto text-center mt-16 space-y-12">
        <div className="space-y-4">
          <h1 className="font-mono text-2xl font-bold">
            Craft a Union, Piece by Piece
          </h1>
          <p className="text-zinc-600">
            Bring your story to life by creating something unique—together.
          </p>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white font-mono"
            onClick={() => {
              if (!isLoggedIn) {
                login({
                  connector: connectors[0],
                });
              }
            }}
            asChild
          >
            <Link href={isLoggedIn ? "/verify" : "#"}>Craft a Union →</Link>
          </Button>
        </div>

        {/* Pixel Art Card */}
        <div className="relative p-8 border-4 border-black bg-white">
          {/* Decorative Border Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black -translate-x-4 -translate-y-4"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black -translate-x-4 translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black translate-x-4 translate-y-4"></div>

          {/* Heart Icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 bg-pink-500"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 pt-4">
            <h2 className="font-mono text-2xl font-bold">
              Welcome to Union Registry!
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto">
              Here, you and your special someone can craft unique half-and-half
              sunglasses and immortalize your union with fun, on-chain
              attestations.
            </p>
            <div className="space-y-2">
              <p className="text-zinc-600">No paperwork, no hassle</p>
              <p className="text-zinc-600">just pure creativity,</p>
              <p className="text-zinc-600">love!</p>
            </div>

            {/* Decorative Elements */}
            <div className="relative h-16">
              <div className="absolute left-8 top-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Sunglasses icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute right-8 top-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Pizza icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute right-16 bottom-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Music note"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
              <div className="absolute left-16 bottom-0">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Rose icon"
                  width={32}
                  height={32}
                  className="pixel-art"
                />
              </div>
            </div>

            <Button className="bg-pink-500 hover:bg-pink-600 text-white font-mono">
              Let's Craft a Union →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
