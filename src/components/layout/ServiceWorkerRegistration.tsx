"use client";

import { useEffect } from "react";

/**
 * Enregistre le service worker (docs/SPEC.md § 60, ÉTAPE 16) après le
 * premier rendu, uniquement en production : en développement, un service
 * worker interférerait avec le rechargement à chaud (Fast Refresh) de
 * Next.js. Échec silencieux et non bloquant : l’application reste
 * pleinement utilisable sans service worker (navigateur incompatible,
 * erreur d’enregistrement, etc.), le hors ligne est alors simplement
 * indisponible plutôt que l’application elle-même.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
      console.error("Échec de l’enregistrement du service worker :", error);
    });
  }, []);

  return null;
}
