"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { Source } from "@/components/mission/Source";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { SOMMATIVE_LABELS } from "@content/engine";

export type ComparisonOption = {
  id: string;
  label: string;
  /** Une valeur par critère, dans le même ordre que `criteriaLabels`. */
  criteriaValues: readonly string[];
};

type SommativeChoiceJustifiedProps = {
  missionId: string;
  itemId: string;
  question: string;
  criteriaLabels: readonly string[];
  options: readonly ComparisonOption[];
  /** Citation de la source des valeurs, si elles sont réelles (docs/SPEC.md § 52). Absente => fictives. */
  sourceCitation?: string;
  /** Appelé après la remise réussie, pour permettre à la mission d’en tenir compte (ex. déblocage de « Mission terminée »). */
  onSubmitted?: () => void;
};

/**
 * Sommative « comparaison guidée + choix justifié » (docs/SPEC.md § 23).
 * Aucune aide, aucune correction immédiate : le dépôt reste "pending"
 * jusqu’à la correction dans `/teacher` (docs/SPEC.md § 30, § 41).
 */
export function SommativeChoiceJustified({
  missionId,
  itemId,
  question,
  criteriaLabels,
  options,
  sourceCitation,
  onSubmitted,
}: SommativeChoiceJustifiedProps) {
  const { submitAssessment } = useProgression();
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return <SommativeSubmittedNotice />;
  }

  async function handleSubmit() {
    if (!choiceId || !justification.trim()) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", { choiceId, justification: justification.trim() });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-ink-muted">
              <th className="py-2 pr-3"> </th>
              {criteriaLabels.map((label) => (
                <th key={label} className="py-2 pr-3">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <tr key={option.id} className="border-b border-border">
                <td className="py-2 pr-3 font-medium text-ink">{option.label}</td>
                {option.criteriaValues.map((value, index) => (
                  <td key={criteriaLabels[index]} className="py-2 pr-3 text-ink">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Source citation={sourceCitation} />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-base font-medium text-ink">{question}</legend>
        {options.map((option) => (
          <label key={option.id} className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name={`${missionId}-${itemId}`}
              checked={choiceId === option.id}
              onChange={() => setChoiceId(option.id)}
              className="h-4 w-4"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-1 text-sm text-ink">
        {SOMMATIVE_LABELS.justificationLabel}
        <textarea
          value={justification}
          onChange={(event) => setJustification(event.target.value)}
          rows={3}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
      </label>

      <button
        type="button"
        disabled={!choiceId || !justification.trim() || submitting}
        onClick={() => void handleSubmit()}
        className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50"
      >
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}
