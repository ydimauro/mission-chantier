"use client";

import { useState } from "react";
import Image from "next/image";
import { SituationReelle } from "@/components/mission/SituationReelle";
import { Objectif } from "@/components/mission/Objectif";
import { Observe } from "@/components/mission/Observe";
import { Hypothese } from "@/components/mission/Hypothese";
import { Problematique } from "@/components/mission/Problematique";
import { EcrisDansTonCours } from "@/components/mission/EcrisDansTonCours";
import { Source } from "@/components/mission/Source";
import { MissionTimer } from "@/components/mission/MissionTimer";
import { DiagnosticChecklist, type DiagnosticOption } from "@/components/mission/DiagnosticChecklist";
import { MissionCompletionFlow } from "@/components/mission/MissionCompletionFlow";
import { DiagnosticNotice } from "@/components/evaluation/DiagnosticNotice";
import { useProgression } from "@/providers/progression-provider";
import { CHANTIER_01 } from "@content/givors/media";

export type PrologueContent = {
  missionId: string;
  heroIntro: string;
  objectifs: readonly string[];
  observeText: string;
  diagnosticQuestion: string;
  diagnosticOptions: readonly DiagnosticOption[];
  hypotheseText: string;
  problematique: string;
  traceEcriteTitle: string;
  traceEcritePrompt: string;
  bilanText: string;
};

/**
 * Prologue commun « Givors se transforme » (ÉTAPE 6, docs/SPEC.md § 65) :
 * une seule mise en œuvre, partagée par 5E-00 et 4E-00, qui ne varient que
 * par leur contenu (content/5e/5e-00.ts, content/4e/4e-00.ts).
 */
export function PrologueGivorsSeTransforme({ content }: { content: PrologueContent }) {
  const { recordResponses } = useProgression();
  const [traceEcriteDone, setTraceEcriteDone] = useState(false);

  return (
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
        <p>{content.heroIntro}</p>
        <div className="mt-2">
          <Source citation={`${CHANTIER_01.source}, ${CHANTIER_01.date}`} />
        </div>
      </SituationReelle>

      <Objectif items={content.objectifs} />

      <DiagnosticNotice />

      <Observe>{content.observeText}</Observe>

      <DiagnosticChecklist
        question={content.diagnosticQuestion}
        options={content.diagnosticOptions}
        onChange={(selected) => recordResponses(content.missionId, { diagnostic: selected })}
      />

      <Problematique>{content.problematique}</Problematique>

      <Hypothese>{content.hypotheseText}</Hypothese>

      <EcrisDansTonCours
        onDone={() => {
          recordResponses(content.missionId, { traceEcriteConfirmee: true });
          setTraceEcriteDone(true);
        }}
      >
        <p className="font-semibold">{content.traceEcriteTitle}</p>
        <p className="mt-1">{content.traceEcritePrompt}</p>
      </EcrisDansTonCours>

      <MissionCompletionFlow
        missionId={content.missionId}
        bilanText={content.bilanText}
        canComplete={traceEcriteDone}
      />

      <MissionTimer />
    </div>
  );
}
