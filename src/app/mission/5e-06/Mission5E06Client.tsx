"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Observe } from "@/components/mission/Observe";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SequencingActivity } from "@/components/mission/SequencingActivity";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_5E_06_PANNE_CHOICES,
  ASSOCIATION_5E_06_PANNE_HINTS,
  ASSOCIATION_5E_06_PANNE_ITEMS,
  MISSION_5E_06,
  MISSION_5E_06_BILAN,
  MISSION_5E_06_TRACE,
  SEQUENCING_5E_06_CORRECT_ORDER,
  SEQUENCING_5E_06_HINTS,
  SEQUENCING_5E_06_STEPS,
} from "@content/5e/5e-06";

export function Mission5E06Client() {
  const { recordResponses } = useProgression();
  const [sequencingDone, setSequencingDone] = useState(false);
  const [panneDone, setPanneDone] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_06.objectifs} />

        <Observe>{MISSION_5E_06.observeText}</Observe>

        <Problematique>{MISSION_5E_06.problematique}</Problematique>

        <Consigne>{MISSION_5E_06.consigneSimulation}</Consigne>

        <SimulationPedagogique>
          <SequencingActivity
            steps={SEQUENCING_5E_06_STEPS}
            correctSequence={SEQUENCING_5E_06_CORRECT_ORDER}
            hints={SEQUENCING_5E_06_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_06.id, { sequencing: result });
              if (result.allCorrect) setSequencingDone(true);
            }}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_06.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_06_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_06_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <Consigne>{MISSION_5E_06.panneIntro}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_06_PANNE_ITEMS}
            choices={ASSOCIATION_5E_06_PANNE_CHOICES}
            hints={ASSOCIATION_5E_06_PANNE_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_06.id, { panne: result });
              if (result.allCorrect) setPanneDone(true);
            }}
          />
        </SimulationPedagogique>

        <MissionCompletionFlow
          missionId={MISSION_5E_06.id}
          bilanText={MISSION_5E_06_BILAN}
          canComplete={sequencingDone && panneDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
