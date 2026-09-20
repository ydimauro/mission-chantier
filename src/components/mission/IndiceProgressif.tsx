"use client";

import { useState } from "react";
import { LightbulbIcon } from "@/components/ui/icons";
import { INDICE_PROGRESSIF_LABELS } from "@content/engine";
import { isIndiceExhausted, nextIndiceLevel } from "@/lib/mission/indice";

type IndiceProgressifProps = {
  /** De 1 à 3 indices, du plus léger au plus fort (docs/PEDAGOGIE.md § 7.3). */
  hints: readonly string[];
};

/**
 * Aides désactivées par défaut pendant les sommatives (docs/SPEC.md § 30) :
 * ce composant n’est destiné qu’aux activités formatives. La mission qui
 * l’utilise décide si et quand l’afficher.
 */
export function IndiceProgressif({ hints }: IndiceProgressifProps) {
  const [level, setLevel] = useState(0);
  const max = hints.length;
  const exhausted = isIndiceExhausted(level, max);

  return (
    <div className="flex flex-col gap-2">
      {hints.slice(0, level).map((hint, index) => (
        <p
          key={index}
          className="rounded-md border border-border bg-surface-muted p-3 text-sm text-ink"
        >
          <span className="font-semibold">{INDICE_PROGRESSIF_LABELS.levelName[index]} : </span>
          {hint}
        </p>
      ))}

      {exhausted ? (
        max > 0 ? <p className="text-sm text-ink-muted">{INDICE_PROGRESSIF_LABELS.exhausted}</p> : null
      ) : (
        <button
          type="button"
          onClick={() => setLevel((current) => nextIndiceLevel(current, max))}
          className="flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          <LightbulbIcon />
          {INDICE_PROGRESSIF_LABELS.reveal}
        </button>
      )}
    </div>
  );
}
