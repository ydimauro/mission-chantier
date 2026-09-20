"use client";

import Link from "next/link";
import { useProgression } from "@/providers/progression-provider";
import { findNextMission } from "@/lib/missions/sequence";
import {
  MISSION_HUB_ALL_DONE_MESSAGE,
  MISSION_HUB_NEXT_LABEL,
  MISSION_HUB_START_BUTTON_LABEL,
  MISSION_HUB_TITLE,
} from "@content/pages/mission-hub";

/**
 * Oriente l’élève vers sa prochaine mission, selon son niveau et ses
 * missions déjà terminées (ÉTAPE 6). Nécessite une identité (affichée par
 * `RequireStudentIdentity` autour de cette page).
 */
export function MissionHub() {
  const { snapshot } = useProgression();
  if (snapshot.status !== "ready") return null;

  const next = findNextMission(snapshot.file.niveau, snapshot.file.completedMissionIds);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-ink">{MISSION_HUB_TITLE}</h1>

      {next ? (
        <>
          <p className="text-base text-ink-muted">
            {MISSION_HUB_NEXT_LABEL} <span className="font-semibold text-ink">{next.id}</span>
          </p>
          <Link
            href={next.href}
            className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-brand-contrast"
          >
            {MISSION_HUB_START_BUTTON_LABEL}
          </Link>
        </>
      ) : (
        <p className="text-base text-ink">{MISSION_HUB_ALL_DONE_MESSAGE}</p>
      )}
    </div>
  );
}
