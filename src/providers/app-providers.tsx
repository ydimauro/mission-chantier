"use client";

import type { ReactNode } from "react";
import { PreferencesProvider } from "@/providers/preferences-provider";
import { LevelProvider } from "@/providers/level-provider";
import { ProgressionProvider } from "@/providers/progression-provider";
import { ServiceWorkerRegistration } from "@/components/layout/ServiceWorkerRegistration";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <LevelProvider>
        <ProgressionProvider>
          <ServiceWorkerRegistration />
          {children}
        </ProgressionProvider>
      </LevelProvider>
    </PreferencesProvider>
  );
}
