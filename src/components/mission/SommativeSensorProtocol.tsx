"use client";

import { useState } from "react";
import { SommativeSubmittedNotice } from "@/components/evaluation/SommativeSubmittedNotice";
import { formatFrenchNumber } from "@/lib/format-number";
import { findAssessmentSubmission } from "@/lib/progression/model";
import { hasRepeatedProtocol, runSensorTest, type SensorTestMeasurement } from "@/lib/simulation/sensor-test";
import { useProgression } from "@/providers/progression-provider";
import { SOMMATIVE_LABELS } from "@content/engine";

export type SensorDistanceOption = { valueM: number; label: string };

type SommativeSensorProtocolProps = {
  missionId: string;
  itemId: string;
  distances: readonly SensorDistanceOption[];
  thresholdOptions: readonly SensorDistanceOption[];
  limitLabel: string;
  onSubmitted?: () => void;
};

export function SommativeSensorProtocol({ missionId, itemId, distances, thresholdOptions, limitLabel, onSubmitted }: SommativeSensorProtocolProps) {
  const { snapshot, submitAssessment } = useProgression();
  const [distance, setDistance] = useState("");
  const [measurements, setMeasurements] = useState<SensorTestMeasurement[]>([]);
  const [threshold, setThreshold] = useState("");
  const [limits, setLimits] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const alreadySubmitted = snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, missionId, itemId) !== null;
  const protocolReady = hasRepeatedProtocol(measurements);
  const canSubmit = protocolReady && threshold !== "" && limits.trim().length > 0;

  if (submitted || alreadySubmitted) return <SommativeSubmittedNotice />;

  function runTest() {
    const distanceM = Number(distance);
    if (!distanceM) return;
    const attempt = measurements.filter((measurement) => measurement.distanceM === distanceM).length + 1;
    setMeasurements((current) => [...current, runSensorTest(distanceM, attempt)]);
  }

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    await submitAssessment(missionId, itemId, "summative", { measurements, thresholdM: Number(threshold), limits: limits.trim() });
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-ink">
        Distance à tester
        <select value={distance} onChange={(event) => setDistance(event.target.value)} className="rounded-md border border-border bg-surface px-3 py-2">
          <option value="">Choisis une distance</option>
          {distances.map((option) => <option key={option.valueM} value={option.valueM}>{option.label}</option>)}
        </select>
      </label>
      <button type="button" disabled={!distance} onClick={runTest} className="w-fit rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand disabled:opacity-50">
        Réaliser un essai
      </button>
      {measurements.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-border bg-surface-muted p-3" aria-live="polite">
          <table className="w-full text-left text-sm">
            <thead><tr><th>Distance</th><th>Essai</th><th>Observation</th></tr></thead>
            <tbody>{measurements.map((measurement) => <tr key={`${measurement.distanceM}-${measurement.attempt}`} className="border-t border-border"><td>{formatFrenchNumber(measurement.distanceM)} m</td><td>{measurement.attempt}</td><td>{measurement.detected ? "Obstacle détecté" : "Obstacle non détecté"}</td></tr>)}</tbody>
          </table>
        </div>
      ) : null}
      {!protocolReady ? <p className="text-sm italic text-ink-muted">Teste au moins trois distances et répète chaque distance deux fois.</p> : null}
      <label className="flex flex-col gap-1 text-sm text-ink">
        Seuil de sécurité proposé
        <select value={threshold} onChange={(event) => setThreshold(event.target.value)} className="rounded-md border border-border bg-surface px-3 py-2">
          <option value="">Choisis un seuil</option>
          {thresholdOptions.map((option) => <option key={option.valueM} value={option.valueM}>{option.label}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink">
        {limitLabel}
        <textarea value={limits} onChange={(event) => setLimits(event.target.value)} rows={3} className="rounded-md border border-border bg-surface px-3 py-2" />
      </label>
      <button type="button" disabled={!canSubmit || submitting} onClick={() => void submit()} className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast disabled:opacity-50">
        {SOMMATIVE_LABELS.submitButton}
      </button>
    </div>
  );
}