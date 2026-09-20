"use client";

import { useState } from "react";
import { CheckCircleIcon, WarningIcon } from "@/components/ui/icons";
import { Feedback } from "@/components/mission/Feedback";
import { IndiceProgressif } from "@/components/mission/IndiceProgressif";
import { ACTIVITY_LABELS } from "@content/engine";
import { formatMessage } from "@/lib/format-message";
import { scoreSequencing, type SequencingResult } from "@/lib/mission/activity-scoring";

export type SequencingStep = {
  id: string;
  label: string;
};

type SequencingActivityProps = {
  /** Étapes affichées dans un ordre mélangé ; `correctSequence` donne l’ordre attendu. */
  steps: readonly SequencingStep[];
  correctSequence: readonly string[];
  hints?: readonly string[];
  onComplete?: (result: SequencingResult) => void;
};

/**
 * Remise en ordre accessible au clavier et à la souris : un menu de
 * position par étape plutôt qu’un glisser-déposer (même choix que
 * `AssociationActivity`, docs/SPEC.md § 23).
 */
export function SequencingActivity({ steps, correctSequence, hints, onComplete }: SequencingActivityProps) {
  const [order, setOrder] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SequencingResult | null>(null);

  function handleVerify() {
    const scored = scoreSequencing(correctSequence, order);
    setResult(scored);
    onComplete?.(scored);
  }

  function handleRetry() {
    setResult(null);
  }

  const positions = steps.map((_, index) => index + 1);
  const allPlaced = steps.every((step) => order[step.id]);
  const correctPositionById = new Map(correctSequence.map((id, index) => [id, index + 1]));

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step) => {
        const isCorrect = result ? order[step.id] === correctPositionById.get(step.id) : false;

        return (
          <div
            key={step.id}
            className={
              result
                ? isCorrect
                  ? "flex flex-wrap items-center gap-3 rounded-md border border-brand bg-surface-muted p-3"
                  : "flex flex-wrap items-center gap-3 rounded-md border border-accent bg-surface-muted p-3"
                : "flex flex-wrap items-center gap-3 rounded-md border border-border bg-surface p-3"
            }
          >
            <label className="flex flex-1 flex-wrap items-center gap-2 text-sm text-ink">
              {step.label}
              <select
                value={order[step.id] ?? ""}
                disabled={Boolean(result)}
                onChange={(event) =>
                  setOrder((current) => ({ ...current, [step.id]: Number(event.target.value) }))
                }
                className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
              >
                <option value="" disabled>
                  {ACTIVITY_LABELS.choicePlaceholder}
                </option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </label>
            {result ? (
              isCorrect ? (
                <span className="text-brand">
                  <CheckCircleIcon />
                </span>
              ) : (
                <span className="text-accent">
                  <WarningIcon />
                </span>
              )
            ) : null}
          </div>
        );
      })}

      {!result ? (
        <button
          type="button"
          disabled={!allPlaced}
          onClick={handleVerify}
          className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50"
        >
          {ACTIVITY_LABELS.verifyButton}
        </button>
      ) : result.allCorrect ? (
        <Feedback tone="success">{ACTIVITY_LABELS.successMessage}</Feedback>
      ) : (
        <>
          <Feedback tone="retry" onRetry={handleRetry}>
            {formatMessage(ACTIVITY_LABELS.partialMessageTemplate, {
              correct: String(result.correctCount),
              total: String(result.total),
            })}
          </Feedback>
          {hints && hints.length > 0 ? <IndiceProgressif hints={hints} /> : null}
        </>
      )}
    </div>
  );
}
