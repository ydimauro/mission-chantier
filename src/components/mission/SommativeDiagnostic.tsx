"use client";

import { useState } from "react";
import { findAssessmentSubmission } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { SOMMATIVE_DIAGNOSTIC_LABELS, SOMMATIVE_LABELS } from "@content/engine";
import { useShuffledForDisplay } from "@/lib/use-shuffled-for-display";

export type DiagnosticTest = {
  id: string;
  label: string;
  result: string;
};

export type DiagnosticChoice = {
  id: string;
  label: string;
};

type SommativeDiagnosticProps = {
  missionId: string;
  itemId: string;
  tests: readonly DiagnosticTest[];
  causes: readonly DiagnosticChoice[];
  solutions: readonly DiagnosticChoice[];
  onSubmitted?: () => void;
};

/**
 * Démarche de diagnostic sommative : les observations sont affichées après
 * chaque test, mais aucune validation de la cause ou de la solution n’est
 * donnée à l’élève. La correction reste réservée à `/teacher`.
 */
export function SommativeDiagnostic({
  missionId,
  itemId,
  tests,
  causes,
  solutions,
  onSubmitted,
}: SommativeDiagnosticProps) {
  const { snapshot, submitAssessment } = useProgression();
  const [selectedTestId, setSelectedTestId] = useState("");
  const [testedIds, setTestedIds] = useState<string[]>([]);
  const [cause, setCause] = useState("");
  const [solution, setSolution] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shuffledTests = useShuffledForDisplay(tests);
  const shuffledCauses = useShuffledForDisplay(causes);
  const shuffledSolutions = useShuffledForDisplay(solutions);

  const alreadySubmitted =
    snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, missionId, itemId) !== null;
  const availableTests = shuffledTests.filter((test) => !testedIds.includes(test.id));
  const tested = shuffledTests.filter((test) => testedIds.includes(test.id));
  const canSubmit = testedIds.length >= 2 && Boolean(cause) && Boolean(solution);

  if (submitted || alreadySubmitted) return <SommativeSubmittedNotice />;

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", { testedIds, cause, solution });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-ink">
        {SOMMATIVE_DIAGNOSTIC_LABELS.testLabel}
        <select
          value={selectedTestId}
          onChange={(event) => setSelectedTestId(event.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2"
        >
          <option value="">{SOMMATIVE_DIAGNOSTIC_LABELS.testPlaceholder}</option>
          {availableTests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        disabled={!selectedTestId}
        onClick={() => {
          if (selectedTestId) setTestedIds((current) => [...current, selectedTestId]);
          setSelectedTestId("");
        }}
        className="w-fit rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand disabled:opacity-50"
      >
        {SOMMATIVE_DIAGNOSTIC_LABELS.runTest}
      </button>

      {tested.length > 0 ? (
        <section aria-live="polite" className="rounded-md border border-border bg-surface-muted p-3">
          <h3 className="font-semibold">{SOMMATIVE_DIAGNOSTIC_LABELS.resultsTitle}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {tested.map((test) => (
              <li key={test.id}>{test.result}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <label className="flex flex-col gap-1 text-sm text-ink">
        {SOMMATIVE_DIAGNOSTIC_LABELS.causeLabel}
        <select value={cause} onChange={(event) => setCause(event.target.value)} className="rounded-md border border-border bg-surface px-3 py-2">
          <option value="">{SOMMATIVE_DIAGNOSTIC_LABELS.causePlaceholder}</option>
          {shuffledCauses.map((choice) => <option key={choice.id} value={choice.id}>{choice.label}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-ink">
        {SOMMATIVE_DIAGNOSTIC_LABELS.solutionLabel}
        <select value={solution} onChange={(event) => setSolution(event.target.value)} className="rounded-md border border-border bg-surface px-3 py-2">
          <option value="">{SOMMATIVE_DIAGNOSTIC_LABELS.solutionPlaceholder}</option>
          {shuffledSolutions.map((choice) => <option key={choice.id} value={choice.id}>{choice.label}</option>)}
        </select>
      </label>

      {!canSubmit ? <p className="text-sm italic text-ink-muted">{SOMMATIVE_DIAGNOSTIC_LABELS.testFirstNotice}</p> : null}
      <button type="button" disabled={!canSubmit || submitting} onClick={() => void submit()} className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50">
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}