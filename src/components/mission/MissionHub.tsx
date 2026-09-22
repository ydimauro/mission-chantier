"use client";

import Link from "next/link";
import { useProgression } from "@/providers/progression-provider";
import { findNextMission } from "@/lib/missions/sequence";
import { formatMessage } from "@/lib/format-message";
import { MISSION_SEQUENCE } from "@content/missions/registry";
import { LEVEL_LABELS } from "@content/config";
import { FolderSetupNotice } from "@/components/progression/FolderSetupNotice";
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
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {formatMessage(MISSION_HUB_PARCOURS_TEMPLATE, { niveau: LEVEL_LABELS[niveau] })}
      </p>
      <h1 className="text-2xl font-bold text-ink">{MISSION_HUB_TITLE}</h1>
      </div>

      <FolderSetupNotice />

      {next ? (
        <div className="flex flex-col items-center gap-4 text-center">
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
        </div>
      ) : (
        <p className="text-center text-base text-ink">{MISSION_HUB_ALL_DONE_MESSAGE}</p>
      )}

      {completedMissionIds.length === 0 ? (
        <section className="rounded-md border border-accent bg-surface-muted p-4" aria-labelledby="discover-title">
          <h2 id="discover-title" className="font-bold text-ink">Avant ta première mission</h2>
          <p className="mt-1 text-sm text-ink">Ouvre les ressources, choisis « Engins » et repère le nom et la fonction de la pelle hydraulique, du tombereau et de la grue. Reviens ensuite ici.</p>
          <Link href="/ressources" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full border border-border bg-surface px-3 py-2 text-sm font-semibold text-ink">Découvrir les engins ↗</Link>
        </section>
      ) : null}

      <section aria-labelledby="missions-title">
        <h2 id="missions-title" className="text-xl font-bold text-ink">Toutes mes missions</h2>
        <p className="mt-1 text-sm text-ink-muted">Choisis la mission demandée par ton professeur ou ta professeure. Tu peux aussi reprendre une mission commencée.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {MISSION_SEQUENCE[niveau].map((mission) => {
            const completed = completedMissionIds.includes(mission.id);
            const inProgress = !completed && (Boolean(responses[mission.id]) || assessments.some((assessment) => assessment.missionId === mission.id));
            const state = completed ? "Terminée" : inProgress ? "En cours" : "À commencer";
            return (
              <li key={mission.id} className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">{mission.id}</p>
                    <p className="mt-1 text-sm leading-5 text-ink-muted">{mission.problematique}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-muted px-2 py-1 text-xs font-semibold text-ink">{state}</span>
                </div>
                <Link href={mission.href} className="mt-3 inline-flex rounded-full border border-border px-3 py-2 text-sm font-semibold text-ink hover:bg-surface-muted">
                  {completed ? "Consulter la mission" : inProgress ? "Reprendre" : "Ouvrir la mission"}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
