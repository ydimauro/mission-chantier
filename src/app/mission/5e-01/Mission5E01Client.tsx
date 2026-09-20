"use client";

import { useState } from "react";
import Image from "next/image";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { SituationReelle } from "@/components/mission/SituationReelle";
import { Objectif } from "@/components/mission/Objectif";
import { Observe } from "@/components/mission/Observe";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Source } from "@/components/mission/Source";
import { useProgression } from "@/providers/progression-provider";
import { CHANTIER_01 } from "@content/givors/media";
import {
  ASSOCIATION_5E_01_CHOICES,
  ASSOCIATION_5E_01_HINTS,
  ASSOCIATION_5E_01_ITEMS,
  MISSION_5E_01,
  MISSION_5E_01_BILAN,
  MISSION_5E_01_TRACE,
} from "@content/5e/5e-01";

export function Mission5E01Client() {
  const { recordResponses } = useProgression();
  const [activityDone, setActivityDone] = useState(false);
  const [traceDone, setTraceDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <SituationReelle>
          <Image
            src={CHANTIER_01.file}
            alt={CHANTIER_01.alt}
            width={1844}
            height={853}
            className="mb-3 h-auto w-full rounded-md object-cover"
            priority
          />
          <p>{MISSION_5E_01.heroIntro}</p>
          <div className="mt-2">
            <Source citation={`${CHANTIER_01.source}, ${CHANTIER_01.date}`} />
          </div>
        </SituationReelle>

        <Objectif items={MISSION_5E_01.objectifs} />

        <Observe>{MISSION_5E_01.observeText}</Observe>

        <Problematique>{MISSION_5E_01.problematique}</Problematique>

        <Consigne>{MISSION_5E_01.consigneSimulation}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_01_ITEMS}
            choices={ASSOCIATION_5E_01_CHOICES}
            hints={ASSOCIATION_5E_01_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_01.id, { association: result });
              if (result.allCorrect) setActivityDone(true);
            }}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_01.id, { traceEcriteConfirmee: true });
            setTraceDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_01_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_01_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_01.id}
          bilanText={MISSION_5E_01_BILAN}
          canComplete={activityDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
