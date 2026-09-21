"use client";

import { useState } from "react";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { HydraulicSimulation } from "@/components/mission/HydraulicSimulation";
import { LimitesDuModele } from "@/components/mission/LimitesDuModele";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Observe } from "@/components/mission/Observe";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeAssociation } from "@/components/mission/SommativeAssociation";
import { SommativeChoiceJustified } from "@/components/mission/SommativeChoiceJustified";
import { SommativeDiagnostic } from "@/components/mission/SommativeDiagnostic";
import { SommativeSimulationReport } from "@/components/mission/SommativeSimulationReport";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import {
  ASSOCIATION_4E_FINAL_CONSTRAINT_CHOICES,
  ASSOCIATION_4E_FINAL_CONSTRAINT_ITEMS,
  COMPARISON_4E_FINAL_CRITERIA,
  COMPARISON_4E_FINAL_OPTIONS,
  DIAGNOSTIC_4E_FINAL_CAUSES,
  DIAGNOSTIC_4E_FINAL_SOLUTIONS,
  DIAGNOSTIC_4E_FINAL_TESTS,
  MISSION_4E_FINAL,
  MISSION_4E_FINAL_BILAN,
} from "@content/4e/4e-final";

const ITEM_IDS = {
  choix: "choix-engin",
  contraintes: "lecture-contraintes",
  diagnostic: "diagnostic-hydraulique",
  simulation: "simulation-hydraulique",
} as const;

function isSubmitted(
  snapshot: ReturnType<typeof useProgression>["snapshot"],
  itemId: string,
): boolean {
  return snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, MISSION_4E_FINAL.id, itemId) !== null;
}

export function Mission4EFinalClient() {
  const { recordResponses, snapshot } = useProgression();
  const [submittedNow, setSubmittedNow] = useState<Record<string, boolean>>({});
  const [measures, setMeasures] = useState<Record<string, number> | null>(null);
  const [traceNow, setTraceNow] = useState(false);
  const itemDone = (itemId: string) => Boolean(submittedNow[itemId]) || isSubmitted(snapshot, itemId);
  const traceDone = traceNow || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_FINAL.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_4E_FINAL.objectifs} />
        <Problematique>{MISSION_4E_FINAL.problematique}</Problematique>
        <Observe>{MISSION_4E_FINAL.intro}</Observe>

        <Consigne>{MISSION_4E_FINAL.consigneChoix}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeChoiceJustified missionId={MISSION_4E_FINAL.id} itemId={ITEM_IDS.choix} question={MISSION_4E_FINAL.choixQuestion} criteriaLabels={COMPARISON_4E_FINAL_CRITERIA} options={COMPARISON_4E_FINAL_OPTIONS} kind="final" onSubmitted={() => setSubmittedNow((current) => ({ ...current, [ITEM_IDS.choix]: true }))} />
        </SimulationPedagogique>

        <Consigne>{MISSION_4E_FINAL.consigneContraintes}</Consigne>
        <SimulationPedagogique>
          <SommativeAssociation missionId={MISSION_4E_FINAL.id} itemId={ITEM_IDS.contraintes} items={ASSOCIATION_4E_FINAL_CONSTRAINT_ITEMS} choices={ASSOCIATION_4E_FINAL_CONSTRAINT_CHOICES} kind="final" onSubmitted={() => setSubmittedNow((current) => ({ ...current, [ITEM_IDS.contraintes]: true }))} />
        </SimulationPedagogique>

        <Consigne>{MISSION_4E_FINAL.consigneDiagnostic}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeDiagnostic missionId={MISSION_4E_FINAL.id} itemId={ITEM_IDS.diagnostic} tests={DIAGNOSTIC_4E_FINAL_TESTS} causes={DIAGNOSTIC_4E_FINAL_CAUSES} solutions={DIAGNOSTIC_4E_FINAL_SOLUTIONS} kind="final" onSubmitted={() => setSubmittedNow((current) => ({ ...current, [ITEM_IDS.diagnostic]: true }))} />
        </SimulationPedagogique>

        <Consigne>{MISSION_4E_FINAL.consigneSimulation}</Consigne>
        <SimulationPedagogique valeursSimplifiees>
          <SommativeSimulationReport missionId={MISSION_4E_FINAL.id} itemId={ITEM_IDS.simulation} hypothesisLabel={MISSION_4E_FINAL.hypothesisLabel} conclusionLabel={MISSION_4E_FINAL.conclusionLabel} measures={measures} kind="final" onSubmitted={() => setSubmittedNow((current) => ({ ...current, [ITEM_IDS.simulation]: true }))}>
            <HydraulicSimulation onSimulationRun={(nextMeasures) => setMeasures({ ...nextMeasures })} />
          </SommativeSimulationReport>
        </SimulationPedagogique>

        <LimitesDuModele>Les données, les engins et le fonctionnement hydraulique de cette situation fictive sont simplifiés pour l’évaluation.</LimitesDuModele>

        <EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_FINAL.id, { traceEcriteConfirmee: true }); setTraceNow(true); }}>
          <p className="font-semibold">{MISSION_4E_FINAL.traceTitle}</p>
          <p className="mt-1">{MISSION_4E_FINAL.tracePrompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow missionId={MISSION_4E_FINAL.id} bilanText={MISSION_4E_FINAL_BILAN} canComplete={itemDone(ITEM_IDS.choix) && itemDone(ITEM_IDS.contraintes) && itemDone(ITEM_IDS.diagnostic) && itemDone(ITEM_IDS.simulation) && traceDone} />
        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}