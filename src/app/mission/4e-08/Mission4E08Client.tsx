"use client";
import { useState } from "react";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { LimitesDuModele } from "@/components/mission/LimitesDuModele";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { SommativeSensorProtocol } from "@/components/mission/SommativeSensorProtocol";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { findAssessmentSubmission, isTraceEcriteConfirmee } from "@/lib/progression/model";
import { useProgression } from "@/providers/progression-provider";
import { MISSION_4E_08, MISSION_4E_08_BILAN, MISSION_4E_08_LIMIT_LABEL, MISSION_4E_08_TRACE, SENSOR_TEST_4E_08_DISTANCES, SENSOR_TEST_4E_08_THRESHOLDS } from "@content/4e/4e-08";
const ITEM_ID = "protocole-capteur";
export function Mission4E08Client() { const { recordResponses, snapshot } = useProgression(); const [submittedNow, setSubmittedNow] = useState(false); const [traceNow, setTraceNow] = useState(false); const submitted = submittedNow || (snapshot.status === "ready" && findAssessmentSubmission(snapshot.file, MISSION_4E_08.id, ITEM_ID) !== null); const trace = traceNow || (snapshot.status === "ready" && isTraceEcriteConfirmee(snapshot.file, MISSION_4E_08.id)); return <RequireStudentIdentity><div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10"><Objectif items={MISSION_4E_08.objectifs}/><Problematique>{MISSION_4E_08.problematique}</Problematique><Consigne>{MISSION_4E_08.consigne}</Consigne><SimulationPedagogique valeursSimplifiees><SommativeSensorProtocol missionId={MISSION_4E_08.id} itemId={ITEM_ID} distances={SENSOR_TEST_4E_08_DISTANCES} thresholdOptions={SENSOR_TEST_4E_08_THRESHOLDS} limitLabel={MISSION_4E_08_LIMIT_LABEL} onSubmitted={() => setSubmittedNow(true)}/></SimulationPedagogique><LimitesDuModele>Ce protocole simplifie le capteur, les obstacles, l’orientation et les conditions réelles du chantier.</LimitesDuModele><EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_08.id, { traceEcriteConfirmee: true }); setTraceNow(true); }}><p className="font-semibold">{MISSION_4E_08_TRACE.title}</p><p className="mt-1">{MISSION_4E_08_TRACE.prompt}</p></EcrisDansTonCours><MissionCompletionFlow missionId={MISSION_4E_08.id} bilanText={MISSION_4E_08_BILAN} canComplete={submitted && trace}/><MissionTimer/></div></RequireStudentIdentity>; }