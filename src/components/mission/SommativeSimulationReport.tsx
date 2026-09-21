"use client";

import { useState, type ReactNode } from "react";
import { useProgression } from "@/providers/progression-provider";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { SIMULATION_REPORT_LABELS, SOMMATIVE_LABELS } from "@content/engine";

type SommativeSimulationReportProps = {
  missionId: string;
  itemId: string;
  hypothesisLabel: string;
  conclusionLabel: string;
  /** Dernières mesures obtenues (`null` tant qu’aucune simulation n’a été lancée). */
  measures: Record<string, number> | null;
  /** L’interface de simulation elle-même (ex. `EvacuationSimulation`), fournie par la mission. */
  children: ReactNode;
  /** Appelé après la remise réussie, pour permettre à la mission d’en tenir compte (ex. déblocage de « Mission terminée »). */
  onSubmitted?: () => void;
};

/**
 * Sommative « hypothèse → simulation → conclusion » (docs/SEANCES_5E.md
 * 5E-08). Reste indépendante du moteur de simulation utilisé : la mission
 * lui passe l’interface de simulation en `children` et les dernières
 * mesures obtenues, sans aucune correction ni indice affichés (docs/SPEC.md
 * § 30). Le dépôt reste "pending" jusqu’à la correction dans `/teacher`.
 */
export function SommativeSimulationReport({
  missionId,
  itemId,
  hypothesisLabel,
  conclusionLabel,
  measures,
  children,
  onSubmitted,
}: SommativeSimulationReportProps) {
  const { submitAssessment } = useProgression();
  const [hypothesis, setHypothesis] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return <SommativeSubmittedNotice />;
  }

  const canSubmit = hypothesis.trim().length > 0 && measures !== null && conclusion.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", {
      hypothesis: hypothesis.trim(),
      measures,
      conclusion: conclusion.trim(),
    });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-ink">
        {hypothesisLabel}
        <textarea
          value={hypothesis}
          onChange={(event) => setHypothesis(event.target.value)}
          rows={2}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
      </label>

      {children}

      {measures === null ? (
        <p className="text-sm italic text-ink-muted">{SIMULATION_REPORT_LABELS.runFirstNotice}</p>
      ) : null}

      <label className="flex flex-col gap-1 text-sm text-ink">
        {conclusionLabel}
        <textarea
          value={conclusion}
          onChange={(event) => setConclusion(event.target.value)}
          rows={3}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
      </label>

      <button
        type="button"
        disabled={!canSubmit || submitting}
        onClick={() => void handleSubmit()}
        className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50"
      >
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}
