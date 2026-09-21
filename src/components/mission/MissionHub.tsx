"use client";

import Link from "next/link";
import { useProgression } from "@/providers/progression-provider";
import { findNextMission } from "@/lib/missions/sequence";
import { formatMessage } from "@/lib/format-message";
import { MISSION_SEQUENCE } from "@content/missions/registry";
import { LEVEL_LABELS } from "@content/config";
import {
  MISSION_HUB_ALL_DONE_MESSAGE,
  MISSION_HUB_NEXT_LABEL,
  MISSION_HUB_OBJECTIF_LABEL,
  MISSION_HUB_PARCOURS_TEMPLATE,
  MISSION_HUB_PROGRESSION_TEMPLATE,
  MISSION_HUB_RESUME_BUTTON_LABEL,
  MISSION_HUB_START_BUTTON_LABEL,
  MISSION_HUB_STATUS_LABELS,
  MISSION_HUB_STATUT_LABEL,
  MISSION_HUB_TITLE,
} from "@content/pages/mission-hub";

/**
 * Oriente l’élève vers sa prochaine mission, selon son niveau et ses
 * missions déjà terminées (ÉTAPE 6, enrichi lors de l’audit ÉTAPE 10) :
 * niveau du parcours, problématique et activité de la mission suivante,
 * son statut, la progression sur l’ensemble du parcours connu, et un
 * bouton dont le libellé distingue une mission jamais commencée d’une
 * mission déjà entamée. Nécessite une identité (affichée par
 * `RequireStudentIdentity` autour de cette page).
 */
export function MissionHub() {
  const { snapshot } = useProgression();
  if (snapshot.status !== "ready") return null;

  const { niveau, completedMissionIds, responses, assessments } = snapshot.file;
  const next = findNextMission(niveau, completedMissionIds);
  const total = MISSION_SEQUENCE[niveau].length;
  const started =
    next !== null &&
    (Boolean(responses[next.id]) || assessments.some((assessment) => assessment.missionId === next.id));

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {formatMessage(MISSION_HUB_PARCOURS_TEMPLATE, { niveau: LEVEL_LABELS[niveau] })}
      </p>
      <h1 className="text-2xl font-bold text-ink">{MISSION_HUB_TITLE}</h1>

      {next ? (
        <>
          <p className="text-base text-ink-muted">
            {MISSION_HUB_NEXT_LABEL} <span className="font-semibold text-ink">{next.id}</span>
          </p>
          <p className="max-w-md text-base text-ink">{next.problematique}</p>

          <dl className="grid w-full max-w-md gap-3 text-left sm:grid-cols-2">
            <div className="rounded-md border border-border bg-surface p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {MISSION_HUB_OBJECTIF_LABEL}
              </dt>
              <dd className="mt-1 text-sm text-ink">{next.activite}</dd>
            </div>
            <div className="rounded-md border border-border bg-surface p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {MISSION_HUB_STATUT_LABEL}
              </dt>
              <dd className="mt-1 text-sm text-ink">{MISSION_HUB_STATUS_LABELS[next.status]}</dd>
            </div>
          </dl>

          <p className="text-sm text-ink-muted">
            {formatMessage(MISSION_HUB_PROGRESSION_TEMPLATE, {
              completed: String(completedMissionIds.length),
              total: String(total),
            })}
          </p>

          <Link
            href={next.href}
            className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-brand-contrast"
          >
            {started ? MISSION_HUB_RESUME_BUTTON_LABEL : MISSION_HUB_START_BUTTON_LABEL}
          </Link>
        </>
      ) : (
        <p className="text-base text-ink">{MISSION_HUB_ALL_DONE_MESSAGE}</p>
      )}
    </div>
  );
}
