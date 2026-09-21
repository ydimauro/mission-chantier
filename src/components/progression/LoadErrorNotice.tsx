"use client";

import { useProgression } from "@/providers/progression-provider";
import { LOAD_ERROR_MESSAGES } from "@content/pages/progression";

/**
 * Affiché quand le chargement initial de la progression échoue (IndexedDB
 * indisponible, navigation privée restrictive, quota dépassé, etc.),
 * plutôt que de laisser la page principale vide sans explication
 * (docs/SPEC.md § 65 ÉTAPE 10, audit § 11 : jamais d’écran blanc silencieux).
 */
export function LoadErrorNotice() {
  const { retryLoad, switchStudent } = useProgression();

  return (
    <div role="alert" className="mx-auto max-w-md rounded-md border border-brand bg-surface-muted p-6">
      <p className="font-semibold text-ink">{LOAD_ERROR_MESSAGES.title}</p>
      <p className="mt-2 text-sm text-ink-muted">{LOAD_ERROR_MESSAGES.body}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={retryLoad}
          className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {LOAD_ERROR_MESSAGES.retry}
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {LOAD_ERROR_MESSAGES.reload}
        </button>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={switchStudent}
          className="w-full rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {LOAD_ERROR_MESSAGES.startNew}
        </button>
        <p className="mt-2 text-xs text-ink-muted">{LOAD_ERROR_MESSAGES.startNewHelp}</p>
      </div>
    </div>
  );
}
