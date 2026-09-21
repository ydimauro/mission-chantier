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

export const MISSION_4E_01: MissionEntry = {
  id: "4E-01",
  niveau: "4e",
  href: "/mission/4e-01",
  status: "essentielle",
  problematique: "Comment est organisée une pelle hydraulique à l’intérieur ?",
  activite: "Identifier les sous-systèmes principaux d’une pelle hydraulique et leur rôle.",
  traceEcrite: "Schéma légendé de la pelle et phrase sur l’évolution des commandes.",
  evaluation: "Évaluation formative (légendage), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 33, slowMinutes: 40, absoluteMaxMinutes: 44 },
};

export const MISSION_4E_02: MissionEntry = {
  id: "4E-02",
  niveau: "4e",
  href: "/mission/4e-02",
  status: "essentielle",
  problematique: "Comment l’énergie circule-t-elle jusqu’au mouvement de l’engin ?",
  activite: "Associer les cinq fonctions d’une chaîne d’énergie aux composants de la pelle.",
  traceEcrite: "Chaîne d’énergie complète et composants associés.",
  evaluation: "Évaluation sommative intermédiaire n° 1, corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 27, averageMinutes: 34, slowMinutes: 42, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_03: MissionEntry = {
  id: "4E-03",
  niveau: "4e",
  href: "/mission/4e-03",
  status: "essentielle",
  problematique: "Comment un fluide peut-il faire bouger un bras d’acier ?",
  activite: "Faire varier pression et débit dans une simulation hydraulique qualitative, puis observer l’effet.",
  traceEcrite: "Chaîne hydraulique et observation de deux essais.",
  evaluation: "Évaluation formative (simulation et observation), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 34, slowMinutes: 41, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_04: MissionEntry = {
  id: "4E-04",
  niveau: "4e",
  href: "/mission/4e-04",
  status: "essentielle",
  problematique: "Comment une information devient-elle une action de l’engin ?",
  activite: "Associer les étapes d’une chaîne d’information aux composants d’une sécurité de proximité.",
  traceEcrite: "Chaîne d’information complète et condition du programme associée.",
  evaluation: "Évaluation formative (chaîne d’information), avec indices progressifs.",
  evaluationJustification: null,
  durations: { fastMinutes: 25, averageMinutes: 32, slowMinutes: 40, absoluteMaxMinutes: 44 },
};

export const MISSION_4E_05: MissionEntry = {
  id: "4E-05",
  niveau: "4e",
  href: "/mission/4e-05",
  status: "essentielle",
  problematique: "Comment trouver la cause d’une panne ?",
  activite: "Choisir des tests, observer leurs résultats, puis proposer une cause et une solution.",
  traceEcrite: "Tableau symptôme / hypothèses / tests / cause retenue / solution proposée.",
  evaluation: "Évaluation sommative intermédiaire n° 2, corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 35, slowMinutes: 42, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_06: MissionEntry = {
  id: "4E-06",
  niveau: "4e",
  href: "/mission/4e-06",
  status: "essentielle",
  problematique: "Peux-tu programmer une sécurité plus complète que celle vue en 5e ?",
  activite: "Construire un programme avec condition et alternative, puis le tester sur quatre scénarios.",
  traceEcrite: "Programme final avec légende des blocs QUAND, SI, ALORS et SINON.",
  evaluation: "Évaluation sommative intermédiaire n° 3, corrigée dans /teacher.",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 36, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_07: MissionEntry = {
  id: "4E-07", niveau: "4e", href: "/mission/4e-07", status: "recommandee",
  problematique: "Comment limiter les conflits entre les engins et les personnes sur le chantier ?",
  activite: "Comparer des organisations de flux et identifier les zones adaptées.",
  traceEcrite: "Tableau comparatif de deux organisations et choix justifié.",
  evaluation: "Évaluation formative (organisation des flux), avec indices progressifs.", evaluationJustification: null,
  durations: { fastMinutes: 22, averageMinutes: 29, slowMinutes: 37, absoluteMaxMinutes: 41 },
};

export const MISSION_4E_08: MissionEntry = {
  id: "4E-08", niveau: "4e", href: "/mission/4e-08", status: "essentielle",
  problematique: "À quelle distance le capteur détecte-t-il correctement un obstacle ?",
  activite: "Construire un protocole, répéter les essais à plusieurs distances et proposer un seuil de sécurité.",
  traceEcrite: "Protocole, tableau de mesures, seuil proposé et limite explicitée.",
  evaluation: "Évaluation sommative intermédiaire n° 4, corrigée dans /teacher.", evaluationJustification: null,
  durations: { fastMinutes: 29, averageMinutes: 37, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_09: MissionEntry = {
  id: "4E-09", niveau: "4e", href: "/mission/4e-09", status: "essentielle",
  problematique: "Une solution technique peut-elle être parfaite sur tous les critères ?",
  activite: "Comparer trois solutions selon des critères de performance et d’environnement.",
  traceEcrite: "Tableau comparatif et conclusion nuancée.",
  evaluation: "Évaluation formative (lecture de données comparatives), avec indices progressifs.", evaluationJustification: null,
  durations: { fastMinutes: 26, averageMinutes: 33, slowMinutes: 41, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_10: MissionEntry = {
  id: "4E-10", niveau: "4e", href: "/mission/4e-10", status: "essentielle",
  problematique: "Comment répondre à un cahier des charges simplifié pour organiser un chantier ?",
  activite: "Proposer une organisation répondant à quatre contraintes et vérifier un réglage par simulation.",
  traceEcrite: "Contraintes, décisions, réglage testé et justification.",
  evaluation: "Évaluation formative (conception guidée), avec indices progressifs.", evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 36, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

export const MISSION_4E_11: MissionEntry = {
  id: "4E-11", niveau: "4e", href: "/mission/4e-11", status: "essentielle",
  problematique: "Peux-tu concevoir un chantier qui utilise l’information pour être plus sûr et plus efficace ?",
  activite: "Programmer un capteur, diagnostiquer un signal et optimiser un réglage de chantier.",
  traceEcrite: "Synthèse structurée et réflexion sur le cahier de 4E-00.",
  evaluation: "Évaluation sommative intégrative n° 5, corrigée dans /teacher.", evaluationJustification: null,
  durations: { fastMinutes: 30, averageMinutes: 38, slowMinutes: 43, absoluteMaxMinutes: 45 },
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

export const MISSION_5E_FINAL: MissionEntry = {
  id: "5E-FINAL",
  niveau: "5e",
  href: "/mission/5e-final",
  status: "essentielle",
  problematique: "Sur un nouveau chantier, sais-tu réutiliser ce que tu as appris ?",
  activite:
    "Mission de transfert sur un chantier nouveau (école de Rocheval) : choix d’engin justifié, lecture de contraintes, simulation d’évacuation notée.",
  traceEcrite: "Phrase de synthèse de la démarche (choix, contraintes lues, résultat de simulation) recopiée sur le cahier.",
  evaluation: "Évaluation finale sommative et certificative (60 % de la note /20), corrigée dans /teacher (docs/EVALUATIONS.md § 4.2).",
  evaluationJustification: null,
  durations: { fastMinutes: 28, averageMinutes: 35, slowMinutes: 43, absoluteMaxMinutes: 45 },
};

/** Ordre de parcours, par niveau. Grandira à chaque étape suivante (11 et au-delà). */
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
    MISSION_5E_FINAL,
  ],
  "4e": [MISSION_4E_00, MISSION_4E_01, MISSION_4E_02, MISSION_4E_03, MISSION_4E_04, MISSION_4E_05, MISSION_4E_06, MISSION_4E_07, MISSION_4E_08, MISSION_4E_09, MISSION_4E_10, MISSION_4E_11],
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
  MISSION_5E_FINAL,
  MISSION_4E_00,
  MISSION_4E_01,
  MISSION_4E_02,
  MISSION_4E_03,
  MISSION_4E_04,
  MISSION_4E_05,
  MISSION_4E_06,
  MISSION_4E_07,
  MISSION_4E_08,
  MISSION_4E_09,
  MISSION_4E_10,
  MISSION_4E_11,
];
