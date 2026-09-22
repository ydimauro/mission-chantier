"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgression } from "@/providers/progression-provider";
import { isTraceEcriteConfirmee } from "@/lib/progression/model";
import { BilanMission } from "@/components/mission/BilanMission";
import { CheckCircleIcon } from "@/components/ui/icons";
import {
  MISSION_TERMINEE_BUTTON_LABEL,
  MISSION_TERMINEE_CONFIRMED_MESSAGE,
} from "@content/engine";
import { DASHBOARD_LABELS, FIREFOX_FALLBACK } from "@content/pages/progression";

type MissionCompletionFlowProps = {
  missionId: string;
  bilanText: string;
  /** Le bouton « Mission terminée » ne s’active qu’une fois cette condition remplie
   * (ex. trace écrite confirmée), pour ne jamais clore une mission à moitié faite. */
  canComplete: boolean;
};

type Phase = "idle" | "saving" | "awaiting-export-confirmation" | "done";

/**
 * Sauvegarde puis confirme la fin de mission, adaptée au navigateur
 * (AGENTS.md règle 15, docs/SAUVEGARDE.md § 5). Partagé par toutes les
 * missions à partir de l’ÉTAPE 6, pour ne pas répéter cette logique dans
 * chacune d’elles.
 */
export function MissionCompletionFlow({ missionId, bilanText, canComplete }: MissionCompletionFlowProps) {
  const { completeMission, exportFile, fileSystemAccessSupported, folderLinked, snapshot } = useProgression();
  const [phase, setPhase] = useState<Phase>("idle");
  const restoredCompletion = snapshot.status === "ready" && (() => {
    const answers = snapshot.file.responses[missionId];
    const hasActivityResponse = answers !== null && typeof answers === "object" && Object.keys(answers as Record<string, unknown>).some((key) => key !== "traceEcriteConfirmee");
    const hasAssessment = snapshot.file.assessments.some((assessment) => assessment.missionId === missionId);
    return isTraceEcriteConfirmee(snapshot.file, missionId) && (hasActivityResponse || hasAssessment);
  })();
  const readyToComplete = canComplete || restoredCompletion;

  async function handleComplete() {
    setPhase("saving");
    const result = await completeMission(missionId);
    if (!result.ok) {
      setPhase("idle");
      return;
    }
    setPhase(fileSystemAccessSupported && folderLinked ? "done" : "awaiting-export-confirmation");
  }

  if (phase === "done") {
    return (
      <BilanMission>
        <p>{bilanText}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
          <CheckCircleIcon />
          {MISSION_TERMINEE_CONFIRMED_MESSAGE}
        </p>
        <p className="mt-3 text-sm text-ink">Ta mission est terminée et ta progression est sauvegardée. Suis maintenant la consigne de ton professeur ou de ta professeure.</p>
        <Link href="/mission" className="mt-3 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast">Retour aux missions</Link>
      </BilanMission>
    );
  }

  if (phase === "awaiting-export-confirmation") {
    return (
      <div className="rounded-md border border-accent bg-surface-muted p-4">
        <p className="text-sm text-ink">{FIREFOX_FALLBACK.notice}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportFile}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
          >
            {DASHBOARD_LABELS.exportFile}
          </button>
          <button
            type="button"
            onClick={() => setPhase("done")}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
          >
            {FIREFOX_FALLBACK.confirmLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!readyToComplete || phase === "saving"}
      onClick={() => void handleComplete()}
      className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-brand-contrast disabled:opacity-50"
    >
      {MISSION_TERMINEE_BUTTON_LABEL}
    </button>
  );
}
