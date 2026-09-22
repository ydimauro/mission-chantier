"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { FIREFOX_FALLBACK, FOLDER_LABELS } from "@content/pages/progression";

/** Oriente l’élève vers le choix du dossier dès qu’il commence son parcours.
 * Le navigateur ne fournit jamais le chemin du dossier à une page web : le
 * message décrit donc le résultat sans prétendre afficher ce chemin. */
export function FolderSetupNotice() {
  const { fileSystemAccessSupported, folderLinked, chooseFolder, exportFile } = useProgression();
  const [message, setMessage] = useState<string | null>(null);

  async function handleChooseFolder() {
    const result = await chooseFolder();
    if (result.ok) setMessage(FOLDER_LABELS.folderActive);
    else if (result.reason === "permission-denied") setMessage(FOLDER_LABELS.permissionDenied);
  }

  if (fileSystemAccessSupported) {
    return (
      <section aria-labelledby="folder-setup-title" className="rounded-md border border-border bg-surface-muted p-4">
        <h2 id="folder-setup-title" className="text-base font-bold text-ink">{FOLDER_LABELS.title}</h2>
        {folderLinked ? (
          <>
            <p className="mt-1 text-sm text-ink">{FOLDER_LABELS.folderActive}</p>
            <p className="mt-1 text-sm text-ink-muted">{FOLDER_LABELS.folderActiveHelp}</p>
          </>
        ) : (
          <p className="mt-1 text-sm text-ink">{FOLDER_LABELS.chooseHelp}</p>
        )}
        <button type="button" onClick={() => void handleChooseFolder()} className="mt-3 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast">
          {FOLDER_LABELS.chooseFolder}
        </button>
        {message ? <p role="status" className="mt-2 text-sm text-ink">{message}</p> : null}
      </section>
    );
  }

  return (
    <section aria-labelledby="folder-setup-title" className="rounded-md border border-border bg-surface-muted p-4">
      <h2 id="folder-setup-title" className="text-base font-bold text-ink">{FOLDER_LABELS.title}</h2>
      <p className="mt-1 text-sm text-ink">{FIREFOX_FALLBACK.notice}</p>
      <button type="button" onClick={exportFile} className="mt-3 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast">
        {FIREFOX_FALLBACK.exportLabel}
      </button>
    </section>
  );
}
