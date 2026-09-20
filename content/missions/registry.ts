import type { MissionMetadata } from "@/lib/pedagogy/validate-mission";
import type { Level } from "@content/config";

/**
 * Registre des missions existantes, alimenté au fil des étapes (ÉTAPE 6 et
 * suivantes). Sert à la validation automatique (docs/SPEC.md § 64, tests
 * 1 à 6) via `validateMissionMetadata` (test/mission-registry.test.ts), et
 * à la navigation « Ma mission » (route et ordre par niveau).
 */

export type MissionEntry = MissionMetadata & {
  niveau: Level;
  href: string;
};

export const MISSION_5E_00: MissionEntry = {
  id: "5E-00",
  niveau: "5e",
  href: "/mission/5e-00",
  status: "essentielle",
  problematique: "Comment transforme-t-on une partie d’une ville ?",
  activite:
    "Observer une à trois photographies réelles du centre-ville de Givors et répondre à quelques questions diagnostiques courtes.",
  traceEcrite:
    "Titre « Mission Chantier : comment transforme-t-on une partie d’une ville ? » puis réponse personnelle à « À ton avis, quelles étapes sont nécessaires pour transformer ce quartier ? ».",
  evaluation: null,
  evaluationJustification: "Diagnostique uniquement : sert à connaître les représentations initiales, ne compte jamais dans la note.",
  durations: { fastMinutes: 15, averageMinutes: 25, slowMinutes: 38, absoluteMaxMinutes: 40 },
};

export const MISSION_4E_00: MissionEntry = {
  id: "4E-00",
  niveau: "4e",
  href: "/mission/4e-00",
  status: "essentielle",
  problematique: "Quels systèmes techniques permettent de réaliser les transformations que tu observes ?",
  activite:
    "Observer des photographies réelles du centre-ville de Givors et répondre à des questions diagnostiques orientées système technique.",
  traceEcrite: "Réponse personnelle conservée dans le cahier, reprise en 4E-11.",
  evaluation: null,
  evaluationJustification: "Diagnostique uniquement : sert à connaître les représentations initiales, ne compte jamais dans la note.",
  durations: { fastMinutes: 15, averageMinutes: 25, slowMinutes: 38, absoluteMaxMinutes: 40 },
};

/** Ordre de parcours, par niveau. Grandira à chaque étape suivante (7 et au-delà). */
export const MISSION_SEQUENCE: Record<Level, readonly MissionEntry[]> = {
  "5e": [MISSION_5E_00],
  "4e": [MISSION_4E_00],
};

export const MISSION_REGISTRY: readonly MissionEntry[] = [MISSION_5E_00, MISSION_4E_00];
