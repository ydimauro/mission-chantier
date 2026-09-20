"use client";

import { useProgression } from "@/providers/progression-provider";
import { CONFLICT_MESSAGES } from "@content/pages/progression";

type ConflictDialogProps = {
  kind: "cache-newer" | "file-newer" | "diverged";
};

export function ConflictDialog({ kind }: ConflictDialogProps) {
  const { resolveConflictChoice, acknowledgeDiverged } = useProgression();

  if (kind === "diverged") {
    return (
      <div role="alertdialog" className="mx-auto max-w-md rounded-md border border-brand bg-surface-muted p-6">
        <p className="text-ink">{CONFLICT_MESSAGES.diverged.message}</p>
        <button
          type="button"
          onClick={acknowledgeDiverged}
          className="mt-4 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {CONFLICT_MESSAGES.diverged.acknowledge}
        </button>
      </div>
    );
  }

  const copy = kind === "cache-newer" ? CONFLICT_MESSAGES.cacheNewer : CONFLICT_MESSAGES.fileNewer;
  const primaryChoice = kind === "cache-newer" ? "keep-cache" : "use-file";
  const secondaryChoice = kind === "cache-newer" ? "use-file" : "keep-cache";
  const primaryLabel = kind === "cache-newer" ? copy.keepCache : copy.useFile;
  const secondaryLabel = kind === "cache-newer" ? copy.useFile : copy.keepCache;

  return (
    <div role="alertdialog" className="mx-auto max-w-md rounded-md border border-brand bg-surface-muted p-6">
      <p className="text-ink">{copy.message}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => void resolveConflictChoice(primaryChoice)}
          className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={() => void resolveConflictChoice(secondaryChoice)}
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
