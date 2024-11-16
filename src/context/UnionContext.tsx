"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UnionContextType {
  selectedNoggle: number | null;
  setSelectedNoggle: (noggle: number | null) => void;
  vows: string;
  setVows: (vows: string) => void;
  eternalToken: string;
  setEternalToken: (token: string) => void;
}

const UnionContext = createContext<UnionContextType | undefined>(undefined);

export function UnionProvider({ children }: { children: ReactNode }) {
  const [selectedNoggle, setSelectedNoggle] = useState<number | null>(null);
  const [vows, setVows] = useState<string>("");
  const [eternalToken, setEternalToken] = useState<string>("");

  return (
    <UnionContext.Provider
      value={{
        selectedNoggle,
        setSelectedNoggle,
        vows,
        setVows,
        eternalToken,
        setEternalToken,
      }}
    >
      {children}
    </UnionContext.Provider>
  );
}

export function useUnion() {
  const context = useContext(UnionContext);
  if (context === undefined) {
    throw new Error("useUnion must be used within a UnionProvider");
  }
  return context;
} 