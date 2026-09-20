"use client";

import type { ReactNode } from "react";
import { PreferencesProvider } from "@/providers/preferences-provider";
import { LevelProvider } from "@/providers/level-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <LevelProvider>{children}</LevelProvider>
    </PreferencesProvider>
  );
}
