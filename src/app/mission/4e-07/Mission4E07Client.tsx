"use client";
import { useState } from "react";
import { AssociationActivity } from "@/components/mission/AssociationActivity";
import { Consigne } from "@/components/mission/Consigne";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { Objectif } from "@/components/mission/Objectif";
import { Problematique } from "@/components/mission/Problematique";
import { SimulationPedagogique } from "@/components/mission/SimulationPedagogique";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { useProgression } from "@/providers/progression-provider";
import { ASSOCIATION_4E_07_CHOICES, ASSOCIATION_4E_07_HINTS, ASSOCIATION_4E_07_ITEMS, MISSION_4E_07, MISSION_4E_07_BILAN, MISSION_4E_07_TRACE } from "@content/4e/4e-07";
export function Mission4E07Client() { const { recordResponses } = useProgression(); const [done, setDone] = useState(false); const [trace, setTrace] = useState(false); return <RequireStudentIdentity><div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10"><Objectif items={MISSION_4E_07.objectifs}/><Problematique>{MISSION_4E_07.problematique}</Problematique><Consigne>{MISSION_4E_07.consigne}</Consigne><SimulationPedagogique><AssociationActivity items={ASSOCIATION_4E_07_ITEMS} choices={ASSOCIATION_4E_07_CHOICES} hints={ASSOCIATION_4E_07_HINTS} onComplete={(result) => { recordResponses(MISSION_4E_07.id, { association: result }); if (result.allCorrect) setDone(true); }}/></SimulationPedagogique><EcrisDansTonCours onDone={() => { recordResponses(MISSION_4E_07.id, { traceEcriteConfirmee: true }); setTrace(true); }}><p className="font-semibold">{MISSION_4E_07_TRACE.title}</p><p className="mt-1">{MISSION_4E_07_TRACE.prompt}</p></EcrisDansTonCours><MissionCompletionFlow missionId={MISSION_4E_07.id} bilanText={MISSION_4E_07_BILAN} canComplete={done && trace}/><MissionTimer/></div></RequireStudentIdentity>; }