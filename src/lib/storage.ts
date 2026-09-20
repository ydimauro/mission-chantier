/**
 * Espace de nommage unique pour toutes les clés de stockage local de
 * l’application. Aucune de ces clés n’est jamais transmise sur le réseau
 * (docs/RGPD.md).
 *
 * Regrouper les clés sous un même préfixe permet à `clearLocalData` de
 * tout effacer d’un bloc, y compris les clés qui seront ajoutées plus tard
 * (progression élève en IndexedDB à l’ÉTAPE 2), sans avoir à modifier cette
 * fonction à chaque nouvelle fonctionnalité.
 */

export const STORAGE_PREFIX = "mission-chantier:";

export const STORAGE_KEYS = {
  preferences: `${STORAGE_PREFIX}preferences`,
  level: `${STORAGE_PREFIX}level`,
  activeStudentCode: `${STORAGE_PREFIX}active-student-code`,
} as const;

function isStorageAvailable(): boolean {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function readStoredJson<T>(key: string): T | null {
  if (!isStorageAvailable()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeStoredJson<T>(key: string, value: T): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Stockage indisponible (navigation privée, quota atteint) : l’application
    // reste utilisable, elle perd seulement la persistance des préférences.
  }
}

/**
 * Efface toutes les données locales de l’application sur ce poste
 * (page /privacy, bouton « Effacer mes données locales »).
 */
export function clearLocalData(): void {
  if (!isStorageAvailable()) {
    return;
  }

  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  for (const key of keysToRemove) {
    window.localStorage.removeItem(key);
  }
}
