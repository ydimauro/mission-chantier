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
  ASSOCIATION_4E_01_CHOICES,
  ASSOCIATION_4E_01_HINTS,
  ASSOCIATION_4E_01_ITEMS,
  MISSION_4E_01,
  MISSION_4E_01_BILAN,
  MISSION_4E_01_TRACE,
} from "@content/4e/4e-01";

export function Mission4E01Client() {
  const { recordResponses, snapshot } = useProgression();
  const [completedDuringSession, setCompletedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const responses = snapshot.status === "ready" ? snapshot.file.responses[MISSION_4E_01.id] : null;
  const activityDone = completedDuringSession || (responses as { association?: { allCorrect?: boolean } } | null)?.association?.allCorrect === true;
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_01.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_01.objectifs} />
        <Problematique>{MISSION_4E_01.problematique}</Problematique>
        <Consigne>{MISSION_4E_01.consigne}</Consigne>
        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_4E_01_ITEMS}
            choices={ASSOCIATION_4E_01_CHOICES}
            hints={ASSOCIATION_4E_01_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_4E_01.id, { association: result });
              if (result.allCorrect) setCompletedDuringSession(true);
            }}
          />
        </SimulationPedagogique>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_01.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_01_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_01_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_01.id} bilanText={MISSION_4E_01_BILAN} canComplete={activityDone && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}