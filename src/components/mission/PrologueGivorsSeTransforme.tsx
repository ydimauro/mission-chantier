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
import { HOME_CONTENT } from "@content/pages/placeholders";
import type { GivorsMedia } from "@content/givors/media";

export type PrologueContent = {
  missionId: string;
  media: GivorsMedia;
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
  const { recordResponses, snapshot } = useProgression();
  const media = content.media;
  const [traceEcriteDone, setTraceEcriteDone] = useState(false);
  const savedResponses = snapshot.status === "ready" ? snapshot.file.responses[content.missionId] : null;
  const possibleHomeChoices = savedResponses !== null && typeof savedResponses === "object" ? (savedResponses as Record<string, unknown>).observationsAccueil : null;
  const homeChoices: string[] = Array.isArray(possibleHomeChoices) ? possibleHomeChoices.filter((choice): choice is string => typeof choice === "string") : [];
  const initialSelected = homeChoices.filter((choice) => content.diagnosticOptions.some((option) => option.id === choice));
  const choiceLabels = homeChoices.flatMap((choice) => {
    const label = HOME_CONTENT.observationChoices.find((option) => option.id === choice)?.label;
    return label ? [label] : [];
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <SituationReelle>
        <Image
          src={media.file}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="mb-3 h-auto w-full rounded-md object-cover"
          priority
        />
        <p>{content.heroIntro}</p>
        <div className="mt-2">
          <Source citation={`${media.source}, ${media.date}`} />
        </div>
      </SituationReelle>

      <Objectif items={content.objectifs} />

      <DiagnosticNotice />

      <Observe>{content.observeText}</Observe>

      {choiceLabels.length > 0 ? <p className="rounded-md border border-border bg-surface-muted p-3 text-sm text-ink">Sur l’accueil, tu avais choisi : <strong>{choiceLabels.join(", ")}</strong>. Tu peux garder ou modifier ces choix.</p> : null}

      <DiagnosticChecklist
        question={content.diagnosticQuestion}
        options={content.diagnosticOptions}
        initialSelected={initialSelected}
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
