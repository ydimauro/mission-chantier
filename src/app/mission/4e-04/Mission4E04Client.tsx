"use client";

import { useState } from "react";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_4E_04_CHOICES,
  ASSOCIATION_4E_04_HINTS,
  ASSOCIATION_4E_04_ITEMS,
  MISSION_4E_04,
  MISSION_4E_04_BILAN,
  MISSION_4E_04_TRACE,
} from "@content/4e/4e-04";

export function Mission4E04Client() {
  const { recordResponses, snapshot } = useProgression();
  const [completedDuringSession, setCompletedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const responses = snapshot.status === "ready" ? snapshot.file.responses[MISSION_4E_04.id] : null;
  const activityDone = completedDuringSession || (responses as { association?: { allCorrect?: boolean } } | null)?.association?.allCorrect === true;
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_04.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_04.objectifs} />
        <Problematique>{MISSION_4E_04.problematique}</Problematique>
        <Consigne>{MISSION_4E_04.consigne}</Consigne>
        <SimulationPedagogique>
          <AssociationActivity items={ASSOCIATION_4E_04_ITEMS} choices={ASSOCIATION_4E_04_CHOICES} hints={ASSOCIATION_4E_04_HINTS} onComplete={(result) => { recordResponses(MISSION_4E_04.id, { association: result }); if (result.allCorrect) setCompletedDuringSession(true); }} />
        </SimulationPedagogique>
        <Consigne>{MISSION_4E_04.programme}</Consigne>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_04.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_04_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_04_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_04.id} bilanText={MISSION_4E_04_BILAN} canComplete={activityDone && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}