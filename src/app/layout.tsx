"use client";

import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/config/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UnionProvider } from "@/context/UnionContext";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <UnionProvider>{children}</UnionProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
