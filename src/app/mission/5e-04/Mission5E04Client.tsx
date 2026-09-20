"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeChoiceJustified } from "@/components/mission/SommativeChoiceJustified";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  MISSION_5E_04,
  MISSION_5E_04_BILAN,
  MISSION_5E_04_CRITERIA,
  MISSION_5E_04_OPTIONS,
  MISSION_5E_04_TRACE,
} from "@content/5e/5e-04";

export function Mission5E04Client() {
  const { recordResponses } = useProgression();
  const [submitted, setSubmitted] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_04.objectifs} />

        <Problematique>{MISSION_5E_04.problematique}</Problematique>

        <Consigne>{MISSION_5E_04.consigne}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <SommativeChoiceJustified
            missionId={MISSION_5E_04.id}
            itemId="choix-engin"
            question={MISSION_5E_04.question}
            criteriaLabels={MISSION_5E_04_CRITERIA}
            options={MISSION_5E_04_OPTIONS}
            onSubmitted={() => setSubmitted(true)}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_04.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_04_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_04_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_04.id}
          bilanText={MISSION_5E_04_BILAN}
          canComplete={submitted && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
