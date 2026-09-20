"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_5E_05_CHOICES,
  ASSOCIATION_5E_05_HINTS,
  ASSOCIATION_5E_05_ITEMS,
  ASSOCIATION_5E_05_SOMMATIVE_ITEMS,
  MISSION_5E_05,
  MISSION_5E_05_BILAN,
  MISSION_5E_05_TRACE,
} from "@content/5e/5e-05";

export function Mission5E05Client() {
  const { recordResponses } = useProgression();
  const [activityDone, setActivityDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_05.objectifs} />

        <Problematique>{MISSION_5E_05.problematique}</Problematique>

        <Consigne>{MISSION_5E_05.consigneSimulation}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_05_ITEMS}
            choices={ASSOCIATION_5E_05_CHOICES}
            hints={ASSOCIATION_5E_05_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_05.id, { association: result });
              if (result.allCorrect) setActivityDone(true);
            }}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_05.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_05_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_05_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <Consigne>{MISSION_5E_05.consigneSommative}</Consigne>

        <SimulationPedagogique>
          <SommativeAssociation
            missionId={MISSION_5E_05.id}
            itemId="mei-sommative"
            items={ASSOCIATION_5E_05_SOMMATIVE_ITEMS}
            choices={ASSOCIATION_5E_05_CHOICES}
            onSubmitted={() => setSubmitted(true)}
          />
        </SimulationPedagogique>

        <MissionCompletionFlow
          missionId={MISSION_5E_05.id}
          bilanText={MISSION_5E_05_BILAN}
          canComplete={activityDone && submitted && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
