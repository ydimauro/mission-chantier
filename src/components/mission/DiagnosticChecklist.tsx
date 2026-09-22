"use client";

import { useState } from "react";

export type DiagnosticOption = {
  id: string;
  label: string;
};

type DiagnosticChecklistProps = {
  question: string;
  options: readonly DiagnosticOption[];
  initialSelected?: readonly string[];
  onChange?: (selectedIds: readonly string[]) => void;
};

/**
 * Question diagnostique courte à choix multiples (docs/SPEC.md § 21).
 * Ne compte jamais dans la note : voir `DiagnosticNotice` à proximité.
 * Réponses stockées en `responses`, jamais dans `assessments` (rien à
 * corriger ici, ce n’est pas une évaluation formative ou sommative).
 */
export function DiagnosticChecklist({ question, options, initialSelected = [], onChange }: DiagnosticChecklistProps) {
  const [selected, setSelected] = useState<readonly string[]>(initialSelected);

  function toggle(id: string) {
    const next = selected.includes(id)
      ? selected.filter((candidate) => candidate !== id)
      : [...selected, id];
    // `onChange` répercute vers ProgressionProvider (un autre composant) :
    // appelé ici, dans le gestionnaire d’évènement, jamais dans le
    // callback de mise à jour de `setSelected`, qui doit rester pur.
    setSelected(next);
    onChange?.(next);
  }

  return (
    <fieldset>
      <legend className="text-base font-medium text-ink">{question}</legend>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={
                checked
                  ? "flex items-center gap-2 rounded-md border border-brand bg-surface-muted px-3 py-2 text-sm text-ink"
                  : "flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
              }
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option.id)}
                className="h-4 w-4"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
