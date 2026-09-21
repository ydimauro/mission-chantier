"use client";
import { useState } from "react";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { ComparisonTable } from "@/components/mission/ComparisonTable";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { Source } from "@/components/mission/Source";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { useProgression } from "@/providers/progression-provider";
import { ASSOCIATION_4E_09_CHOICES, ASSOCIATION_4E_09_HINTS, ASSOCIATION_4E_09_ITEMS, COMPARISON_4E_09_CRITERIA, COMPARISON_4E_09_OPTIONS, MISSION_4E_09, MISSION_4E_09_BILAN, MISSION_4E_09_TRACE } from "@content/4e/4e-09";
export function Mission4E09Client() { const { recordResponses } = useProgression(); const [done, setDone] = useState(false); const [trace, setTrace] = useState(false); return <RequireStudentIdentity><div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10"><Objectif items={MISSION_4E_09.objectifs}/><Problematique>{MISSION_4E_09.problematique}</Problematique><Consigne>{MISSION_4E_09.consigne}</Consigne><SimulationPedagogique valeursSimplifiees><ComparisonTable criteriaLabels={COMPARISON_4E_09_CRITERIA} options={COMPARISON_4E_09_OPTIONS}/><Source/><div className="mt-4"><AssociationActivity items={ASSOCIATION_4E_09_ITEMS} choices={ASSOCIATION_4E_09_CHOICES} hints={ASSOCIATION_4E_09_HINTS} onComplete={(result) => { recordResponses(MISSION_4E_09.id, { association: result }); if (result.allCorrect) setDone(true); }}/></div></SimulationPedagogique><EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_09.id, { traceEcriteConfirmee: true }); setTrace(true); }}><p className="font-semibold">{MISSION_4E_09_TRACE.title}</p><p className="mt-1">{MISSION_4E_09_TRACE.prompt}</p></EcrisDansTonCours><MissionCompletionFlow missionId={MISSION_4E_09.id} bilanText={MISSION_4E_09_BILAN} canComplete={done && trace}/><MissionTimer/></div></RequireStudentIdentity>; }