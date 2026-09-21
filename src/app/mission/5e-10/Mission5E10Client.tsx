"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeBlockProgram } from "@/components/mission/SommativeBlockProgram";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  BLOCK_PROGRAM_5E_10_ACTIONS,
  BLOCK_PROGRAM_5E_10_COMPARATORS,
  BLOCK_PROGRAM_5E_10_SCENARIOS,
  BLOCK_PROGRAM_5E_10_THRESHOLDS,
  MISSION_5E_10,
  MISSION_5E_10_BILAN,
  MISSION_5E_10_TRACE,
} from "@content/5e/5e-10";

export function Mission5E10Client() {
  const { recordResponses } = useProgression();
  const [submitted, setSubmitted] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_10.objectifs} />

        <Problematique>{MISSION_5E_10.problematique}</Problematique>

        <Consigne>{MISSION_5E_10.consigne}</Consigne>

        <SimulationPedagogique>
          <SommativeBlockProgram
            missionId={MISSION_5E_10.id}
            itemId="securite-arriere"
            comparatorOptions={BLOCK_PROGRAM_5E_10_COMPARATORS}
            thresholdOptions={BLOCK_PROGRAM_5E_10_THRESHOLDS}
            actionOptions={BLOCK_PROGRAM_5E_10_ACTIONS}
            scenarios={BLOCK_PROGRAM_5E_10_SCENARIOS}
            onSubmitted={() => setSubmitted(true)}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_10.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_10_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_10_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_10.id}
          bilanText={MISSION_5E_10_BILAN}
          canComplete={submitted && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
