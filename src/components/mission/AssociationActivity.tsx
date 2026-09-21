"use client";

import { useState } from "react";
import { CheckCircleIcon, WarningIcon } from "@/components/ui/icons";
import { Feedback } from "@/components/mission/Feedback";
import { IndiceProgressif } from "@/components/mission/IndiceProgressif";
import { ACTIVITY_LABELS } from "@content/engine";
import { formatMessage } from "@/lib/format-message";
import { scoreAssociation, type AssociationResult } from "@/lib/mission/activity-scoring";
import { useShuffledForDisplay } from "@/lib/use-shuffled-for-display";

export type AssociationChoice = {
  id: string;
  label: string;
};

export type AssociationItem = {
  id: string;
  prompt: string;
  correctChoiceId: string;
};

type AssociationActivityProps = {
  items: readonly AssociationItem[];
  /** Choix proposés dans un ordre mélangé, identique pour chaque élément
   * pendant une même tentative,
   * (docs/SPEC.md § 23 « association », avec alternative clavier native :
   * un menu déroulant, plutôt qu’un glisser-déposer, pour rester
   * utilisable au clavier et à la souris sans code séparé). */
  choices: readonly AssociationChoice[];
  hints?: readonly string[];
  onComplete?: (result: AssociationResult) => void;
};

export function AssociationActivity({ items, choices, hints, onComplete }: AssociationActivityProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssociationResult | null>(null);
  const shuffledChoices = useShuffledForDisplay(choices);

  function handleVerify() {
    const scored = scoreAssociation(items, answers);
    setResult(scored);
    onComplete?.(scored);
  }

  function handleRetry() {
    setResult(null);
  }

  const allAnswered = items.every((item) => answers[item.id]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isIncorrect = result ? result.incorrectItemIds.includes(item.id) : false;
        const isCorrect = result ? !isIncorrect : false;

        return (
          <div
            key={item.id}
            className={
              result
                ? isIncorrect
                  ? "flex flex-wrap items-center gap-3 rounded-md border border-accent bg-surface-muted p-3"
                  : "flex flex-wrap items-center gap-3 rounded-md border border-brand bg-surface-muted p-3"
                : "flex flex-wrap items-center gap-3 rounded-md border border-border bg-surface p-3"
            }
          >
            <label className="flex flex-1 flex-wrap items-center gap-2 text-sm text-ink">
              {item.prompt}
              <select
                value={answers[item.id] ?? ""}
                disabled={Boolean(result)}
                onChange={(event) => setAnswers((current) => ({ ...current, [item.id]: event.target.value }))}
                className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
              >
                <option value="" disabled>
                  {ACTIVITY_LABELS.choicePlaceholder}
                </option>
                {shuffledChoices.map((choice) => (
                  <option key={choice.id} value={choice.id}>
                    {choice.label}
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
          disabled={!allAnswered}
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
