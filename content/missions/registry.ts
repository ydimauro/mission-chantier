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

export const MISSION_5E_01: MissionEntry = {
  id: "5E-01",
  niveau: "5e",
  href: "/mission/5e-01",
  status: "essentielle",
  problematique: "À quels besoins les objets techniques du chantier répondent-ils ?",
  activite: "Associer, dans le Quartier des Ateliers, chaque besoin de chantier à l’objet technique qui y répond.",
  traceEcrite: "Tableau à quatre colonnes (besoin / utilisateur / objet ou système technique / contrainte) pour les quatre situations de la mission.",
  evaluation: "Évaluation formative (association), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 33, slowMinutes: 41, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_02: MissionEntry = {
  id: "5E-02",
  niveau: "5e",
  href: "/mission/5e-02",
  status: "recommandee",
  problematique: "Transformer un quartier signifie-t-il tout détruire ?",
  activite: "Classer, dans le Quartier des Ateliers, six situations selon l’action réalisée (démolir, conserver, rénover, transporter, reconstruire, aménager).",
  traceEcrite: "Tableau à trois colonnes (besoin / fonction / solution) pour deux situations au choix.",
  evaluation: "Évaluation formative (classement), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 22, averageMinutes: 28, slowMinutes: 36, absoluteMaxMinutes: 40 },
};

export const MISSION_5E_03: MissionEntry = {
  id: "5E-03",
  niveau: "5e",
  href: "/mission/5e-03",
  status: "essentielle",
  problematique: "Comment reconnaître le bon engin pour une tâche donnée ?",
  activite: "Associer, dans le Quartier des Ateliers, sept engins de chantier à leur fonction principale.",
  traceEcrite: "Tableau à deux colonnes (engin / fonction principale) pour les sept engins vus dans la mission.",
  evaluation: "Évaluation formative (association), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 25, averageMinutes: 32, slowMinutes: 40, absoluteMaxMinutes: 44 },
};

export const MISSION_5E_04: MissionEntry = {
  id: "5E-04",
  niveau: "5e",
  href: "/mission/5e-04",
  status: "essentielle",
  problematique: "Comment choisir un engin quand plusieurs semblent convenir ?",
  activite: "Comparer trois engins selon plusieurs critères et choisir le plus adapté à une situation donnée.",
  traceEcrite: "Tableau de comparaison des trois engins recopié, puis phrase justifiant le choix.",
  evaluation: "Évaluation sommative intermédiaire n° 1 (choix argumenté), corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 35, slowMinutes: 42, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_05: MissionEntry = {
  id: "5E-05",
  niveau: "5e",
  href: "/mission/5e-05",
  status: "essentielle",
  problematique: "Un chantier fait circuler bien plus que des matériaux : quoi exactement ?",
  activite: "Classer des éléments du chantier selon trois familles (matière, énergie, information).",
  traceEcrite: "Tableau à trois colonnes (matière / énergie / information) avec deux exemples au choix pour chaque famille.",
  evaluation: "Évaluation formative puis évaluation sommative intermédiaire n° 2 (classement), corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 27, averageMinutes: 34, slowMinutes: 42, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_06: MissionEntry = {
  id: "5E-06",
  niveau: "5e",
  href: "/mission/5e-06",
  status: "essentielle",
  problematique: "Comment l’énergie circule-t-elle depuis sa source jusqu’au mouvement du bras ?",
  activite: "Remettre en ordre les six étapes de la chaîne d’énergie d’une pelle hydraulique, puis diagnostiquer une panne simple.",
  traceEcrite: "Schéma de la chaîne d’énergie en six étapes recopié, avec l’élément qui transforme l’énergie en mouvement entouré.",
  evaluation: "Évaluation formative (remise en ordre et diagnostic), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 34, slowMinutes: 41, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_07: MissionEntry = {
  id: "5E-07",
  niveau: "5e",
  href: "/mission/5e-07",
  status: "recommandee",
  problematique: "Comment faire travailler les engins sans empêcher complètement les autres usages ?",
  activite: "Organiser une zone de chantier du Quartier des Ateliers : accès engins, passage des personnes, stockage, zone interdite, sécurité.",
  traceEcrite: "Plan annoté du Quartier des Ateliers, légendé zone par zone, avec une justification courte pour chacune.",
  evaluation: "Évaluation formative (association), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 22, averageMinutes: 29, slowMinutes: 37, absoluteMaxMinutes: 41 },
};

export const MISSION_5E_08: MissionEntry = {
  id: "5E-08",
  niveau: "5e",
  href: "/mission/5e-08",
  status: "essentielle",
  problematique: "Quelle organisation permet d’évacuer les gravats le plus efficacement ?",
  activite: "Formuler une hypothèse, lancer la simulation d’évacuation de gravats, mesurer et ajuster.",
  traceEcrite: "Hypothèse, résultat de la simulation (mesures) et conclusion recopiés.",
  evaluation: "Évaluation sommative intermédiaire n° 3 (hypothèse, simulation, conclusion), corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 36, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_09: MissionEntry = {
  id: "5E-09",
  niveau: "5e",
  href: "/mission/5e-09",
  status: "essentielle",
  problematique: "Comment un engin détecte-t-il un obstacle derrière lui ?",
  activite: "Lire un programme capteur → information → traitement → action, observer l’effet d’un changement de seuil, puis prédire.",
  traceEcrite: "Schéma capteur → information → traitement → action, avec le programme modifié recopié.",
  evaluation: "Évaluation formative (lecture et prédiction), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 33, slowMinutes: 41, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_10: MissionEntry = {
  id: "5E-10",
  niveau: "5e",
  href: "/mission/5e-10",
  status: "essentielle",
  problematique: "Peux-tu programmer toi-même une sécurité simple pour un engin ?",
  activite: "Construire un programme de sécurité (condition + action) et le tester sur plusieurs scénarios.",
  traceEcrite: "Programme final recopié (condition et action), avec une légende de chaque bloc utilisé.",
  evaluation: "Évaluation sommative intermédiaire n° 4 (programmation testée), corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 36, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

export const MISSION_5E_11: MissionEntry = {
  id: "5E-11",
  niveau: "5e",
  href: "/mission/5e-11",
  status: "essentielle",
  problematique: "Existe-t-il un engin meilleur que les autres sur tous les critères ?",
  activite: "Lire un tableau comparatif (engin thermique, hybride, électrique) et répondre à des questions de synthèse.",
  traceEcrite: "Tableau comparatif recopié, avec une phrase de conclusion sur l’absence de solution meilleure sur tous les critères.",
  evaluation: "Évaluation formative (lecture de données comparatives), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 25, averageMinutes: 32, slowMinutes: 40, absoluteMaxMinutes: 44 },
};

export const MISSION_5E_12: MissionEntry = {
  id: "5E-12",
  niveau: "5e",
  href: "/mission/5e-12",
  status: "essentielle",
  activite: "Mission intégrative : choisir des engins, organiser la circulation, simuler l’évacuation des gravats et justifier.",
  problematique: "Peux-tu organiser toi-même une partie du chantier du Quartier des Ateliers ?",
  traceEcrite: "Synthèse structurée (besoin, contraintes, choix, résultat de simulation, justification), puis boucle réflexive sur le cahier de 5E-00.",
  evaluation: "Évaluation formative sur l’ensemble du parcours de la mission (mobilisation transversale, non sommative).",
  evaluationJustification: null,
  durations: { fastMinutes: 30, averageMinutes: 38, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

/** Ordre de parcours, par niveau. Grandira à chaque étape suivante (10 et au-delà). */
export const MISSION_SEQUENCE: Record<Level, readonly MissionEntry[]> = {
  "5e": [
    MISSION_5E_00,
    MISSION_5E_01,
    MISSION_5E_02,
    MISSION_5E_03,
    MISSION_5E_04,
    MISSION_5E_05,
    MISSION_5E_06,
    MISSION_5E_07,
    MISSION_5E_08,
    MISSION_5E_09,
    MISSION_5E_10,
    MISSION_5E_11,
    MISSION_5E_12,
  ],
  "4e": [MISSION_4E_00],
};

export const MISSION_REGISTRY: readonly MissionEntry[] = [
  MISSION_5E_00,
  MISSION_5E_01,
  MISSION_5E_02,
  MISSION_5E_03,
  MISSION_5E_04,
  MISSION_5E_05,
  MISSION_5E_06,
  MISSION_5E_07,
  MISSION_5E_08,
  MISSION_5E_09,
  MISSION_5E_10,
  MISSION_5E_11,
  MISSION_5E_12,
  MISSION_4E_00,
];
