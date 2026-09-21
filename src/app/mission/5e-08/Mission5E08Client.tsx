"use client";

import { useState } from "react";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { Consigne } from "@/components/mission/Consigne";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { EvacuationSimulation } from "@/components/mission/EvacuationSimulation";
import { SommativeSimulationReport } from "@/components/mission/SommativeSimulationReport";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { useProgression } from "@/providers/progression-provider";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import type { EvacuationMeasures } from "@/lib/simulation/evacuation";
import { MISSION_5E_08, MISSION_5E_08_BILAN, MISSION_5E_08_TRACE } from "@content/5e/5e-08";

export function Mission5E08Client() {
  const { recordResponses, snapshot } = useProgression();
  const [measures, setMeasures] = useState<EvacuationMeasures | null>(null);
  const [submittedThisSession, setSubmittedThisSession] = useState(false);
  const [traceConfirmedThisSession, setTraceConfirmedThisSession] = useState(false);

  const submitted =
    submittedThisSession ||
    (snapshot.status === "ready" &&
      findAssessmentSubmission(snapshot.file, MISSION_5E_08.id, "evacuation-gravats") !== null);
  const traceDone =
    traceConfirmedThisSession ||
    (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_5E_08.id));

  return (
    <RequireStudentIdentity>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
        <Objectif items={MISSION_5E_08.objectifs} />

        <Problematique>{MISSION_5E_08.problematique}</Problematique>

        <Consigne>{MISSION_5E_08.consigne}</Consigne>

        <SimulationPedagogique valeursSimplifiees>
          <SommativeSimulationReport
            missionId={MISSION_5E_08.id}
            itemId="evacuation-gravats"
            hypothesisLabel={MISSION_5E_08.hypothesisLabel}
            conclusionLabel={MISSION_5E_08.conclusionLabel}
            measures={measures}
            onSubmitted={() => setSubmittedThisSession(true)}
          >
            <EvacuationSimulation onSimulationRun={setMeasures} />
          </SommativeSimulationReport>
        </SimulationPedagogique>

        <EcrisDansTonCours
          onDone={() => {
            recordResponses(MISSION_5E_08.id, { traceEcriteConfirmee: true });
            setTraceConfirmedThisSession(true);
          }}
        >
          <p className="font-semibold">{MISSION_5E_08_TRACE.title}</p>
          <p className="mt-1">{MISSION_5E_08_TRACE.prompt}</p>
        </EcrisDansTonCours>

        <MissionCompletionFlow
          missionId={MISSION_5E_08.id}
          bilanText={MISSION_5E_08_BILAN}
          canComplete={submitted && traceDone}
        />

        <MissionTimer />
      </div>
    </RequireStudentIdentity>
  );
}
