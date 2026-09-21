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
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_4E_02_CHOICES,
  ASSOCIATION_4E_02_ITEMS,
  MISSION_4E_02,
  MISSION_4E_02_BILAN,
  MISSION_4E_02_TRACE,
} from "@content/4e/4e-02";

const ITEM_ID = "chaine-energie";

export function Mission4E02Client() {
  const { recordResponses, snapshot } = useProgression();
  const [submittedDuringSession, setSubmittedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const submitted = submittedDuringSession || (snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, MISSION_4E_02.id, ITEM_ID) !== null);
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_02.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_02.objectifs} />
        <Problematique>{MISSION_4E_02.problematique}</Problematique>
        <Consigne>{MISSION_4E_02.consigne}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeAssociation missionId={MISSION_4E_02.id} itemId={ITEM_ID} items={ASSOCIATION_4E_02_ITEMS} choices={ASSOCIATION_4E_02_CHOICES} onSubmitted={() => setSubmittedDuringSession(true)} />
        </SimulationPedagogique>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_02.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_02_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_02_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_02.id} bilanText={MISSION_4E_02_BILAN} canComplete={submitted && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}