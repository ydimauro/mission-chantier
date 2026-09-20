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
import {
  ASSOCIATION_5E_02_CHOICES,
  ASSOCIATION_5E_02_HINTS,
  ASSOCIATION_5E_02_ITEMS,
  MISSION_5E_02,
  MISSION_5E_02_BILAN,
  MISSION_5E_02_TRACE,
} from "@content/5e/5e-02";

export function Mission5E02Client() {
  const { recordResponses } = useProgression();
  const [activityDone, setActivityDone] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_02.objectifs} />

        <Problematique>{MISSION_5E_02.problematique}</Problematique>

        <Consigne>{MISSION_5E_02.consigneSimulation}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_02_ITEMS}
            choices={ASSOCIATION_5E_02_CHOICES}
            hints={ASSOCIATION_5E_02_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_02.id, { association: result });
              if (result.allCorrect) setActivityDone(true);
            }}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_02.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_02_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_02_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_02.id}
          bilanText={MISSION_5E_02_BILAN}
          canComplete={activityDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
