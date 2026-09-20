import { MISSION_SEQUENCE, type MissionEntry } from "@content/missions/registry";
import type { Level } from "@content/config";

/**
 * Prochaine mission non terminée pour un niveau donné (docs/SPEC.md §
 * « Ma progression », prochaine mission). `null` quand tout le parcours
 * connu à ce jour est déjà terminé.
 */
export function findNextMission(
  niveau: Level,
  completedMissionIds: readonly string[],
): MissionEntry | null {
  const sequence = MISSION_SEQUENCE[niveau];
  return sequence.find((mission) => !completedMissionIds.includes(mission.id)) ?? null;
}
