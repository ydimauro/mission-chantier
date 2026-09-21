import type { MissionStatus } from "@/lib/pedagogy/validate-mission";

/**
 * Espace « Ma mission » (ÉTAPE 6, enrichi lors de l’audit ÉTAPE 10) :
 * oriente l’élève vers sa prochaine mission, selon son niveau et les
 * missions déjà terminées, avec assez de contexte (objectif, statut,
 * progression) pour comprendre où il en est sans avoir à ouvrir la mission.
 */

export const MISSION_HUB_TITLE = "Ma mission";

export const MISSION_HUB_PARCOURS_TEMPLATE = "Parcours {niveau}";

export const MISSION_HUB_NEXT_LABEL = "Ta prochaine mission :";

export const MISSION_HUB_OBJECTIF_LABEL = "Objectif";

export const MISSION_HUB_STATUT_LABEL = "Statut";

export const MISSION_HUB_STATUS_LABELS: Record<MissionStatus, string> = {
  essentielle: "Essentielle",
  recommandee: "Recommandée",
  approfondissement: "Approfondissement",
};

export const MISSION_HUB_PROGRESSION_TEMPLATE = "Missions terminées : {completed} sur {total}.";

export const MISSION_HUB_START_BUTTON_LABEL = "Commencer la mission";

export const MISSION_HUB_RESUME_BUTTON_LABEL = "Poursuivre la mission";

export const MISSION_HUB_ALL_DONE_MESSAGE =
  "Tu as terminé toutes les missions disponibles pour le moment. Reviens un peu plus tard.";
