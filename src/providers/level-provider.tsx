"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readStoredJson, writeStoredJson, STORAGE_KEYS } from "@/lib/storage";
import type { Level } from "@content/config";

const DEFAULT_LEVEL: Level = "5e";

type LevelContextValue = {
  level: Level;
  setLevel: (level: Level) => void;
};

const LevelContext = createContext<LevelContextValue | null>(null);

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<Level>(DEFAULT_LEVEL);

  useEffect(() => {
    const stored = readStoredJson<Level>(STORAGE_KEYS.level);
    if (stored === "5e" || stored === "4e") {
      // Lecture ponctuelle de localStorage après montage : le premier rendu
      // (serveur puis client) reste identique à DEFAULT_LEVEL, ce qui évite
      // toute divergence d’hydratation sans recourir à un script de
      // démarrage inline (incompatible avec la CSP stricte, docs/ARCHITECTURE.md § 6).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLevelState(stored);
    }
  }, []);

  const setLevel = useCallback((next: Level) => {
    setLevelState(next);
    writeStoredJson(STORAGE_KEYS.level, next);
  }, []);

  const value = useMemo<LevelContextValue>(
    () => ({ level, setLevel }),
    [level, setLevel],
  );

  return <LevelContext.Provider value={value}>{children}</LevelContext.Provider>;
}

export function useLevel(): LevelContextValue {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel doit être utilisé dans un LevelProvider.");
  }
  return context;
}
