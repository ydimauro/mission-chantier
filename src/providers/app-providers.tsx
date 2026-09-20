"use client";

import type { ReactNode } from "react";
import { PreferencesProvider } from "@/providers/preferences-provider";
import { LevelProvider } from "@/providers/level-provider";
import { ProgressionProvider } from "@/providers/progression-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <LevelProvider>
        <ProgressionProvider>{children}</ProgressionProvider>
      </LevelProvider>
    </PreferencesProvider>
  );
}
