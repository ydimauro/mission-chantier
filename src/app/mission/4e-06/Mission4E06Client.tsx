"use client";

import { useState } from "react";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeBlockProgram } from "@/components/mission/SommativeBlockProgram";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  BLOCK_PROGRAM_4E_06_ACTIONS,
  BLOCK_PROGRAM_4E_06_COMPARATORS,
  BLOCK_PROGRAM_4E_06_ELSE_ACTIONS,
  BLOCK_PROGRAM_4E_06_SCENARIOS,
  BLOCK_PROGRAM_4E_06_THRESHOLDS,
  MISSION_4E_06,
  MISSION_4E_06_BILAN,
  MISSION_4E_06_TRACE,
} from "@content/4e/4e-06";

const ITEM_ID = "securite-deplacement";

export function Mission4E06Client() {
  const { recordResponses, snapshot } = useProgression();
  const [submittedDuringSession, setSubmittedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const submitted = submittedDuringSession || (snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, MISSION_4E_06.id, ITEM_ID) !== null);
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_06.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_06.objectifs} />
        <Problematique>{MISSION_4E_06.problematique}</Problematique>
        <Consigne>{MISSION_4E_06.consigne}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeBlockProgram
            missionId={MISSION_4E_06.id}
            itemId={ITEM_ID}
            comparatorOptions={BLOCK_PROGRAM_4E_06_COMPARATORS}
            thresholdOptions={BLOCK_PROGRAM_4E_06_THRESHOLDS}
            actionOptions={BLOCK_PROGRAM_4E_06_ACTIONS}
            elseActionOptions={BLOCK_PROGRAM_4E_06_ELSE_ACTIONS}
            scenarios={BLOCK_PROGRAM_4E_06_SCENARIOS}
            onSubmitted={() => setSubmittedDuringSession(true)}
          />
        </SimulationPedagogique>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_06.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_06_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_06_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_06.id} bilanText={MISSION_4E_06_BILAN} canComplete={submitted && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}