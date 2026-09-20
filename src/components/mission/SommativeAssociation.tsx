"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { ACTIVITY_LABELS, SOMMATIVE_LABELS } from "@content/engine";
import type { AssociationChoice, AssociationItem } from "@/components/mission/AssociationActivity";

type SommativeAssociationProps = {
  missionId: string;
  itemId: string;
  items: readonly AssociationItem[];
  choices: readonly AssociationChoice[];
  /** Appelé après la remise réussie, pour permettre à la mission d’en tenir compte (ex. déblocage de « Mission terminée »). */
  onSubmitted?: () => void;
};

/**
 * Association sommative (docs/SPEC.md § 23) : même présentation que
 * `AssociationActivity`, mais sans correction ni aide immédiate (aides
 * désactivées pendant les sommatives, docs/SPEC.md § 30). Le dépôt reste
 * "pending" jusqu’à la correction dans `/teacher`.
 */
export function SommativeAssociation({ missionId, itemId, items, choices, onSubmitted }: SommativeAssociationProps) {
  const { submitAssessment } = useProgression();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return <SommativeSubmittedNotice />;
  }

  const allAnswered = items.every((item) => answers[item.id]);

  async function handleSubmit() {
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", { answers });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <label
          key={item.id}
          className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface p-3 text-sm text-ink"
        >
          {item.prompt}
          <select
            value={answers[item.id] ?? ""}
            onChange={(event) => setAnswers((current) => ({ ...current, [item.id]: event.target.value }))}
            className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
          >
            <option value="" disabled>
              {ACTIVITY_LABELS.choicePlaceholder}
            </option>
            {choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </select>
        </label>
      ))}

      <button
        type="button"
        disabled={!allAnswered || submitting}
        onClick={() => void handleSubmit()}
        className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50"
      >
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}
