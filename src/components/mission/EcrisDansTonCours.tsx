"use client";

import { useState, type ReactNode } from "react";
import { PencilIcon } from "@/components/ui/icons";
import { ECRIS_DANS_TON_COURS_DONE_LABEL, ECRIS_DANS_TON_COURS_LABEL } from "@content/engine";

type EcrisDansTonCoursProps = {
  children: ReactNode;
  /** Appelé quand l’élève confirme avoir écrit dans son cours sur papier. */
  onDone?: () => void;
};

/**
 * Rappelle ce que l’élève doit écrire dans son cours. Le bouton de
 * confirmation ne valide jamais à lui seul une compétence (docs/SPEC.md § 12) :
 * il ne fait qu’enregistrer que l’élève déclare avoir terminé d’écrire.
 */
export function EcrisDansTonCours({ children, onDone }: EcrisDansTonCoursProps) {
  const [done, setDone] = useState(false);

  return (
    <section className="rounded-md border border-accent bg-surface-muted p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
        <PencilIcon />
        {ECRIS_DANS_TON_COURS_LABEL}
      </h3>
      <div className="mt-2 text-base leading-7 text-ink">{children}</div>
      {onDone ? (
        <button
          type="button"
          disabled={done}
          onClick={() => {
            setDone(true);
            onDone();
          }}
          className="mt-3 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink disabled:opacity-60"
        >
          {ECRIS_DANS_TON_COURS_DONE_LABEL}
        </button>
      ) : null}
    </section>
  );
}
