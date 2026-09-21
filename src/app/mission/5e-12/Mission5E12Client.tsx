"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { EvacuationSimulation } from "@/components/mission/EvacuationSimulation";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_5E_12_CIRCULATION_CHOICES,
  ASSOCIATION_5E_12_CIRCULATION_HINTS,
  ASSOCIATION_5E_12_CIRCULATION_ITEMS,
  ASSOCIATION_5E_12_ENGINS_CHOICES,
  ASSOCIATION_5E_12_ENGINS_HINTS,
  ASSOCIATION_5E_12_ENGINS_ITEMS,
  MISSION_5E_12,
  MISSION_5E_12_BILAN,
} from "@content/5e/5e-12";

export function Mission5E12Client() {
  const { recordResponses } = useProgression();
  const [enginsDone, setEnginsDone] = useState(false);
  const [circulationDone, setCirculationDone] = useState(false);
  const [syntheseDone, setSyntheseDone] = useState(false);
  const [reflexionDone, setReflexionDone] = useState(false);

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_12.objectifs} />

        <Problematique>{MISSION_5E_12.problematique}</Problematique>

        <Consigne>{MISSION_5E_12.consigneEngins}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_12_ENGINS_ITEMS}
            choices={ASSOCIATION_5E_12_ENGINS_CHOICES}
            hints={ASSOCIATION_5E_12_ENGINS_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_12.id, { engins: result });
              if (result.allCorrect) setEnginsDone(true);
            }}
          />
        </SimulationPedagogique>

        <Consigne>{MISSION_5E_12.consigneCirculation}</Consigne>

        <SimulationPedagogique>
          <AssociationActivity
            items={ASSOCIATION_5E_12_CIRCULATION_ITEMS}
            choices={ASSOCIATION_5E_12_CIRCULATION_CHOICES}
            hints={ASSOCIATION_5E_12_CIRCULATION_HINTS}
            onComplete={(result) => {
              recordResponses(MISSION_5E_12.id, { circulation: result });
              if (result.allCorrect) setCirculationDone(true);
            }}
          />
        </SimulationPedagogique>

        <Consigne>{MISSION_5E_12.consigneSimulation}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <EvacuationSimulation
            onSimulationRun={(measures) => recordResponses(MISSION_5E_12.id, { simulation: measures })}
          />
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_12.id, { syntheseConfirmee: true });
            setSyntheseDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_12.syntheseTitle}</p>
          <p className="mt-1">{MISSION_5E_12.synthesePrompt}</p>
        </EcrisDansTonCours>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_12.id, { reflexionConfirmee: true });
            setReflexionDone(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_12.reflexionTitle}</p>
          <p className="mt-1">{MISSION_5E_12.reflexionPrompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_12.id}
          bilanText={MISSION_5E_12_BILAN}
          canComplete={enginsDone && circulationDone && syntheseDone && reflexionDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
