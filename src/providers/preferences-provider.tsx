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
import {
  DEFAULT_PREFERENCES,
  nextTextScale,
  type Preferences,
  type Theme,
} from "@/lib/preferences";

export type { Preferences, Theme, TextScale } from "@/lib/preferences";

type PreferencesContextValue = {
  preferences: Preferences;
  setTheme: (theme: Theme) => void;
  toggleDyslexiaFriendly: () => void;
  cycleTextScale: () => void;
  toggleProjectorMode: () => void;
  togglePerformanceMode: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyPreferencesToDocument(preferences: Preferences): void {
  const root = document.documentElement;

  if (preferences.theme) {
    root.setAttribute("data-theme", preferences.theme);
  } else {
    root.removeAttribute("data-theme");
  }

  root.setAttribute("data-dyslexia", String(preferences.dyslexiaFriendly));
  root.setAttribute("data-text-scale", String(preferences.textScale));
  root.setAttribute("data-projector", String(preferences.projectorMode));
  root.setAttribute("data-performance", String(preferences.performanceMode));
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = readStoredJson<Preferences>(STORAGE_KEYS.preferences);
    if (stored) {
      // Lecture ponctuelle de localStorage après montage : le premier rendu
      // (serveur puis client) reste identique à DEFAULT_PREFERENCES, ce qui
      // évite toute divergence d’hydratation sans recourir à un script de
      // démarrage inline (incompatible avec la CSP stricte, docs/ARCHITECTURE.md § 6).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreferences({ ...DEFAULT_PREFERENCES, ...stored });
    }
  }, []);

  useEffect(() => {
    applyPreferencesToDocument(preferences);
    writeStoredJson(STORAGE_KEYS.preferences, preferences);
  }, [preferences]);

  const setTheme = useCallback((theme: Theme) => {
    setPreferences((current) => ({ ...current, theme }));
  }, []);

  const toggleDyslexiaFriendly = useCallback(() => {
    setPreferences((current) => ({
      ...current,
      dyslexiaFriendly: !current.dyslexiaFriendly,
    }));
  }, []);

  const cycleTextScale = useCallback(() => {
    setPreferences((current) => ({
      ...current,
      textScale: nextTextScale(current.textScale),
    }));
  }, []);

  const toggleProjectorMode = useCallback(() => {
    setPreferences((current) => ({
      ...current,
      projectorMode: !current.projectorMode,
    }));
  }, []);

  const togglePerformanceMode = useCallback(() => {
    setPreferences((current) => ({
      ...current,
      performanceMode: !current.performanceMode,
    }));
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      setTheme,
      toggleDyslexiaFriendly,
      cycleTextScale,
      toggleProjectorMode,
      togglePerformanceMode,
    }),
    [
      preferences,
      setTheme,
      toggleDyslexiaFriendly,
      cycleTextScale,
      toggleProjectorMode,
      togglePerformanceMode,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences doit être utilisé dans un PreferencesProvider.");
  }
  return context;
}
