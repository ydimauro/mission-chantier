"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import { evaluateCondition } from "@/lib/mission/block-program";
import {
  ASSOCIATION_5E_09_CHOICES,
  ASSOCIATION_5E_09_HINTS,
  ASSOCIATION_5E_09_ITEMS,
  MISSION_5E_09,
  MISSION_5E_09_BILAN,
  MISSION_5E_09_TRACE,
  OBSERVATION_5E_09_DISTANCE_M,
  OBSERVATION_5E_09_THRESHOLDS,
} from "@content/5e/5e-09";

export function Mission5E09Client() {
  const { recordResponses } = useProgression();
  const [thresholdId, setThresholdId] = useState<string>(OBSERVATION_5E_09_THRESHOLDS[0].id);
  const [observed, setObserved] = useState(false);
  const [predictionDone, setPredictionDone] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  const selectedThreshold =
    OBSERVATION_5E_09_THRESHOLDS.find((option) => option.id === thresholdId) ?? OBSERVATION_5E_09_THRESHOLDS[0];
  const triggered = evaluateCondition(OBSERVATION_5E_09_DISTANCE_M, "<", selectedThreshold.valueM);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_09.objectifs} />

        <Problematique>{MISSION_5E_09.problematique}</Problematique>

        <Consigne>{MISSION_5E_09.observationIntro}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <div className="flex flex-col gap-3">
            <pre className="overflow-x-auto rounded-md border border-border bg-surface-muted p-3 font-mono text-sm text-ink">
              {MISSION_5E_09.programLines.join("\n")}
            </pre>

            <label className="flex flex-wrap items-center gap-2 text-sm text-ink">
              {MISSION_5E_09.observationThresholdLabel}
              <select
                value={thresholdId}
                onChange={(event) => {
                  setThresholdId(event.target.value);
                  setObserved(false);
                }}
                className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
              >
                {OBSERVATION_5E_09_THRESHOLDS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setObserved(true)}
              className="w-fit rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
            >
              {MISSION_5E_09.observationButton}
            </button>

            {observed ? (
              <p className="text-sm text-ink">
                {triggered
                  ? MISSION_5E_09.observationOutcomeTriggered
                  : MISSION_5E_09.observationOutcomeNotTriggered}
              </p>
            ) : null}
          </div>
        </SimulationPedagogique>

        <SimulationPedagogique valeursSimplifiees>
          <AssociationActivity
            items={ASSOCIATION_5E_09_ITEMS}
            choices={ASSOCIATION_5E_09_CHOICES}
            hints={ASSOCIATION_5E_09_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_09.id, { prediction: result });
              if (result.allCorrect) setPredictionDone(true);
            }}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_09.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_09_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_09_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_09.id}
          bilanText={MISSION_5E_09_BILAN}
          canComplete={predictionDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
