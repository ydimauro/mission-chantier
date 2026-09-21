"use client";

import { useState } from "react";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeDiagnostic } from "@/components/mission/SommativeDiagnostic";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  DIAGNOSTIC_4E_05_CAUSES,
  DIAGNOSTIC_4E_05_SOLUTIONS,
  DIAGNOSTIC_4E_05_TESTS,
  MISSION_4E_05,
  MISSION_4E_05_BILAN,
  MISSION_4E_05_TRACE,
} from "@content/4e/4e-05";

const ITEM_ID = "diagnostic-panne";

export function Mission4E05Client() {
  const { recordResponses, snapshot } = useProgression();
  const [submittedDuringSession, setSubmittedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const submitted = submittedDuringSession || (snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, MISSION_4E_05.id, ITEM_ID) !== null);
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_05.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_05.objectifs} />
        <Problematique>{MISSION_4E_05.problematique}</Problematique>
        <Consigne>{MISSION_4E_05.consigne}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeDiagnostic missionId={MISSION_4E_05.id} itemId={ITEM_ID} tests={DIAGNOSTIC_4E_05_TESTS} causes={DIAGNOSTIC_4E_05_CAUSES} solutions={DIAGNOSTIC_4E_05_SOLUTIONS} onSubmitted={() => setSubmittedDuringSession(true)} />
        </SimulationPedagogique>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_05.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_05_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_05_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_05.id} bilanText={MISSION_4E_05_BILAN} canComplete={submitted && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}