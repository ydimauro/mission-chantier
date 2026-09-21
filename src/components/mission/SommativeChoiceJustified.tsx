"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { Source } from "@/components/mission/Source";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { ComparisonTable, type ComparisonOption } from "@/components/mission/ComparisonTable";
import type { AssessmentKind } from "@/lib/schemas/proof";
import { findAssessmentSubmission } from "@/lib/progression/model";
import { useShuffledForDisplay } from "@/lib/use-shuffled-for-display";
import { SOMMATIVE_LABELS } from "@content/engine";

export type { ComparisonOption };

type SommativeChoiceJustifiedProps = {
  missionId: string;
  itemId: string;
  question: string;
  criteriaLabels: readonly string[];
  options: readonly ComparisonOption[];
  /** Citation de la source des valeurs, si elles sont réelles (docs/SPEC.md § 52). Absente => fictives. */
  sourceCitation?: string;
  /** "summative" (défaut) pour une sommative intermédiaire, "final" pour la finale (docs/EVALUATIONS.md § 4.2). */
  kind?: AssessmentKind;
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
  kind = "summative",
  onSubmitted,
}: SommativeChoiceJustifiedProps) {
  const { submitAssessment, snapshot } = useProgression();
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shuffledOptions = useShuffledForDisplay(options);

  const alreadySubmitted =
    snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, missionId, itemId) !== null;

  if (submitted || alreadySubmitted) {
    return <SommativeSubmittedNotice />;
  }

  async function handleSubmit() {
    if (!choiceId || !justification.trim()) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, kind, { choiceId, justification: justification.trim() });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <ComparisonTable criteriaLabels={criteriaLabels} options={options} />

      <Source citation={sourceCitation} />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-base font-medium text-ink">{question}</legend>
        {shuffledOptions.map((option) => (
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
