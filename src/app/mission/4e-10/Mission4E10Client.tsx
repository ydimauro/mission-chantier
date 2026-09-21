"use client";
import { useState } from "react";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { HydraulicSimulation } from "@/components/mission/HydraulicSimulation";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { useProgression } from "@/providers/progression-provider";
import { ASSOCIATION_4E_10_CHOICES, ASSOCIATION_4E_10_HINTS, ASSOCIATION_4E_10_ITEMS, MISSION_4E_10, MISSION_4E_10_BILAN, MISSION_4E_10_TRACE } from "@content/4e/4e-10";
export function Mission4E10Client() { const { recordResponses } = useProgression(); const [constraintsDone, setConstraintsDone] = useState(false); const [simulationDone, setSimulationDone] = useState(false); const [trace, setTrace] = useState(false); return <RequireStudentIdentity><div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10"><Objectif items={MISSION_4E_10.objectifs}/><Problematique>{MISSION_4E_10.problematique}</Problematique><Consigne>{MISSION_4E_10.consigne}</Consigne><SimulationPedagogique><AssociationActivity items={ASSOCIATION_4E_10_ITEMS} choices={ASSOCIATION_4E_10_CHOICES} hints={ASSOCIATION_4E_10_HINTS} onComplete={(result) => { recordResponses(MISSION_4E_10.id, { constraints: result }); if (result.allCorrect) setConstraintsDone(true); }}/></SimulationPedagogique><SimulationPedagogique valeursSimplifiees><HydraulicSimulation onSimulationRun={(measures) => { recordResponses(MISSION_4E_10.id, { hydraulicSimulation: measures }); setSimulationDone(true); }}/></SimulationPedagogique><EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_10.id, { traceEcriteConfirmee: true }); setTrace(true); }}><p className="font-semibold">{MISSION_4E_10_TRACE.title}</p><p className="mt-1">{MISSION_4E_10_TRACE.prompt}</p></EcrisDansTonCours><MissionCompletionFlow missionId={MISSION_4E_10.id} bilanText={MISSION_4E_10_BILAN} canComplete={constraintsDone && simulationDone && trace}/><MissionTimer/></div></RequireStudentIdentity>; }