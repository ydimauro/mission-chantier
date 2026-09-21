"use client";

import { useState } from "react";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { HydraulicSimulation } from "@/components/mission/HydraulicSimulation";
import { LimitesDuModele } from "@/components/mission/LimitesDuModele";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_4E_03_CHOICES,
  ASSOCIATION_4E_03_HINTS,
  ASSOCIATION_4E_03_ITEMS,
  MISSION_4E_03,
  MISSION_4E_03_BILAN,
  MISSION_4E_03_TRACE,
} from "@content/4e/4e-03";

export function Mission4E03Client() {
  const { recordResponses, snapshot } = useProgression();
  const [ranDuringSession, setRanDuringSession] = useState(false);
  const [completedDuringSession, setCompletedDuringSession] = useState(false);
  const [traceDuringSession, setTraceDuringSession] = useState(false);
  const responses = snapshot.status === "ready" ? snapshot.file.responses[MISSION_4E_03.id] : null;
  const simulationDone = ranDuringSession || Boolean((responses as { hydraulic?: unknown } | null)?.hydraulic);
  const activityDone = completedDuringSession || (responses as { observation?: { allCorrect?: boolean } } | null)?.observation?.allCorrect === true;
  const traceDone = traceDuringSession || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_03.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_03.objectifs} />
        <Problematique>{MISSION_4E_03.problematique}</Problematique>
        <Consigne>{MISSION_4E_03.consigne}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <HydraulicSimulation onSimulationRun={(measures) => { recordResponses(MISSION_4E_03.id, { hydraulic: measures }); setRanDuringSession(true); }} />
        </SimulationPedagogique>
        <LimitesDuModele>{MISSION_4E_03.limits}</LimitesDuModele>
        <SimulationPedagogique>
          <AssociationActivity items={ASSOCIATION_4E_03_ITEMS} choices={ASSOCIATION_4E_03_CHOICES} hints={ASSOCIATION_4E_03_HINTS} onComplete={(result) => { recordResponses(MISSION_4E_03.id, { observation: result }); if (result.allCorrect) setCompletedDuringSession(true); }} />
        </SimulationPedagogique>
        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_03.id, { traceEcriteConfirmee: true }); setTraceDuringSession(true); }}>
          <p className="font-semibold">{MISSION_4E_03_TRACE.title}</p>
          <p className="mt-1">{MISSION_4E_03_TRACE.prompt}</p>
        </EcrisDansTonCours>
        <MissionCompletionFlow missionId={MISSION_4E_03.id} bilanText={MISSION_4E_03_BILAN} canComplete={simulationDone && activityDone && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}