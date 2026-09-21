"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { ComparisonTable } from "@/components/mission/ComparisonTable";
import { Source } from "@/components/mission/Source";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_5E_11_CHOICES,
  ASSOCIATION_5E_11_HINTS,
  ASSOCIATION_5E_11_ITEMS,
  COMPARISON_5E_11_CRITERIA,
  COMPARISON_5E_11_OPTIONS,
  MISSION_5E_11,
  MISSION_5E_11_BILAN,
  MISSION_5E_11_TRACE,
} from "@content/5e/5e-11";

export function Mission5E11Client() {
  const { recordResponses } = useProgression();
  const [activityDone, setActivityDone] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_11.objectifs} />

        <Problematique>{MISSION_5E_11.problematique}</Problematique>

        <Consigne>{MISSION_5E_11.consigneSimulation}</Consigne>

        <SimulationPedagogique>
          <div className="flex flex-col gap-4">
            <ComparisonTable criteriaLabels={COMPARISON_5E_11_CRITERIA} options={COMPARISON_5E_11_OPTIONS} />
            <Source />
            <AssociationActivity
              items={ASSOCIATION_5E_11_ITEMS}
              choices={ASSOCIATION_5E_11_CHOICES}
              hints={ASSOCIATION_5E_11_HINTS}
              onComplete={(result) => {
                recordResponses(MISSION_5E_11.id, { association: result });
                if (result.allCorrect) setActivityDone(true);
              }}
            />
          </div>
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_11.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_11_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_11_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_11.id}
          bilanText={MISSION_5E_11_BILAN}
          canComplete={activityDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
