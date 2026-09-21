"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Observe } from "@/components/mission/Observe";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeChoiceJustified } from "@/components/mission/SommativeChoiceJustified";
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";
import { SommativeSimulationReport } from "@/components/mission/SommativeSimulationReport";
import { EvacuationSimulation } from "@/components/mission/EvacuationSimulation";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import type { EvacuationMeasures } from "@/lib/simulation/evacuation";
import {
  ASSOCIATION_5E_FINAL_LECTURE_CHOICES,
  ASSOCIATION_5E_FINAL_LECTURE_ITEMS,
  COMPARISON_5E_FINAL_CRITERIA,
  COMPARISON_5E_FINAL_OPTIONS,
  MISSION_5E_FINAL,
  MISSION_5E_FINAL_BILAN,
  SIMULATION_5E_FINAL_SCENARIO,
} from "@content/5e/5e-final";

/**
 * Ces trois dépôts sont sommatifs (docs/EVALUATIONS.md § 4.2) : une fois
 * remis, ils ne peuvent plus être repris (docs/SPEC.md § 30). L’état
 * « déjà fait » doit donc survivre à un remontage (rechargement de page,
 * reprise un autre jour) en se basant sur le fichier persistant, pas sur
 * un simple état React local. Recalculé à chaque rendu plutôt que capturé
 * une seule fois dans un état React (un initialiseur paresseux de
 * `useState` ne s’exécute qu’au tout premier rendu, souvent avant que
 * `snapshot` ne passe de "loading" à "ready" : la valeur resterait figée
 * à `false` pour toujours).
 */
function alreadyDone(
  snapshot: ReturnType<typeof useProgression>["snapshot"],
  missionId: string,
  itemId: string,
): boolean {
  return snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, missionId, itemId) !== null;
}

export function Mission5EFinalClient() {
  const { recordResponses, snapshot } = useProgression();
  const [choixSubmitted, setChoixSubmitted] = useState(false);
  const [lectureSubmitted, setLectureSubmitted] = useState(false);
  const [measures, setMeasures] = useState<EvacuationMeasures | null>(null);
  const [simulationSubmitted, setSimulationSubmitted] = useState(false);
  const [traceConfirmed, setTraceConfirmed] = useState(false);

  const choixDone = choixSubmitted || alreadyDone(snapshot, MISSION_5E_FINAL.id, "choix-engin");
  const lectureDone = lectureSubmitted || alreadyDone(snapshot, MISSION_5E_FINAL.id, "lecture-contraintes");
  const simulationDone = simulationSubmitted || alreadyDone(snapshot, MISSION_5E_FINAL.id, "simulation-rocheval");
  const traceDone =
    traceConfirmed || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_5E_FINAL.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_FINAL.objectifs} />

        <Problematique>{MISSION_5E_FINAL.problematique}</Problematique>

        <Observe>{MISSION_5E_FINAL.intro}</Observe>

        <Consigne>{MISSION_5E_FINAL.consigneChoix}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <SommativeChoiceJustified
            missionId={MISSION_5E_FINAL.id}
            itemId="choix-engin"
            question={MISSION_5E_FINAL.choixQuestion}
            criteriaLabels={COMPARISON_5E_FINAL_CRITERIA}
            options={COMPARISON_5E_FINAL_OPTIONS}
            kind="final"
            onSubmitted={() => setChoixSubmitted(true)}
          />
        </SimulationPedagogique>

        <Consigne>{MISSION_5E_FINAL.consigneLecture}</Consigne>

        <SimulationPedagogique>
          <SommativeAssociation
            missionId={MISSION_5E_FINAL.id}
            itemId="lecture-contraintes"
            items={ASSOCIATION_5E_FINAL_LECTURE_ITEMS}
            choices={ASSOCIATION_5E_FINAL_LECTURE_CHOICES}
            kind="final"
            onSubmitted={() => setLectureSubmitted(true)}
          />
        </SimulationPedagogique>

        <Consigne>{MISSION_5E_FINAL.consigneSimulation}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <SommativeSimulationReport
            missionId={MISSION_5E_FINAL.id}
            itemId="simulation-rocheval"
            hypothesisLabel={MISSION_5E_FINAL.hypothesisLabel}
            conclusionLabel={MISSION_5E_FINAL.conclusionLabel}
            measures={measures}
            kind="final"
            onSubmitted={() => setSimulationSubmitted(true)}
          >
            <EvacuationSimulation initialScenario={SIMULATION_5E_FINAL_SCENARIO} onSimulationRun={setMeasures} />
          </SommativeSimulationReport>
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_FINAL.id, { traceEcriteConfirmee: true });
            setTraceConfirmed(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_FINAL.traceTitle}</p>
          <p className="mt-1">{MISSION_5E_FINAL.tracePrompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_FINAL.id}
          bilanText={MISSION_5E_FINAL_BILAN}
          canComplete={choixDone && lectureDone && simulationDone && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
