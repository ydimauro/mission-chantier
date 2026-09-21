import type { EvacuationMeasures, EvacuationScenario } from "@/lib/simulation/evacuation";

/**
 * Libellés des composants génériques du moteur pédagogique (ÉTAPE 3,
 * docs/SPEC.md § 65). Ces composants ne portent aucun contenu de mission :
 * le texte réel (problématique, consignes, objectifs...) sera fourni par
 * chaque mission à partir de l’ÉTAPE 6, via `children` ou des props.
 */

export const SITUATION_REELLE_BADGE = "Situation réelle";

export const SIMULATION_PEDAGOGIQUE_BADGE = "Simulation pédagogique";

export const SIMULATION_VALEURS_SIMPLIFIEES =
  "Les valeurs ont été simplifiées pour permettre l’activité.";

export const PROBLEMATIQUE_LABEL = "Problématique";

export const OBJECTIF_LABEL_SINGULIER = "Objectif";
export const OBJECTIF_LABEL_PLURIEL = "Objectifs";

export const OBSERVE_LABEL = "Observe";

export const HYPOTHESE_LABEL = "Formule une hypothèse";
export const HYPOTHESE_RAPPEL_CAHIER = "Note ton hypothèse dans ton cahier.";

export const CONSIGNE_LABEL = "Consigne";

export const MANIPULE_LABEL = "Manipule";

export const MESURE_LABEL = "Mesure";

export const COMPARE_LABEL = "Compare";

export const ECRIS_DANS_TON_COURS_LABEL = "Écris dans ton cours";
export const ECRIS_DANS_TON_COURS_DONE_LABEL = "J’ai terminé d’écrire";

export const A_RETENIR_LABEL = "À retenir";

export const LIMITES_DU_MODELE_LABEL = "Limites du modèle";

export const BILAN_MISSION_LABEL = "Bilan";

export const SOURCE_LABEL = "Source";
export const SOURCE_FICTIVE_LABEL = "Valeur pédagogique fictive";

export const INDICE_PROGRESSIF_LABELS = {
  levelName: ["Indice 1", "Indice 2", "Indice 3"] as const,
  reveal: "Voir un indice",
  exhausted: "Tu as vu tous les indices.",
} as const;

export const FEEDBACK_RETRY_BUTTON_LABEL = "Nouvel essai";

export const MISSION_TIMER_LABEL = "Temps sur cette mission";

export const MISSION_TERMINEE_BUTTON_LABEL = "Mission terminée";
export const MISSION_TERMINEE_CONFIRMED_MESSAGE = "Mission terminée. Ta progression a été enregistrée.";

export const ACTIVITY_LABELS = {
  verifyButton: "Vérifier",
  retryButton: "Recommencer",
  successMessage: "Bravo, toutes tes réponses sont correctes.",
  partialMessageTemplate: "Tu as {correct} bonne réponse sur {total}. Regarde les réponses entourées et corrige-les.",
  choicePlaceholder: "Choisis une réponse",
} as const;

export const SOMMATIVE_LABELS = {
  justificationLabel: "Explique ton choix.",
  submitButton: "Remettre mon évaluation",
} as const;

export const EVACUATION_SIMULATION_LABELS = {
  planLabel: "Plan 2D du Quartier des Ateliers",
  zoneGravats: "Zone de gravats",
  zoneTrajet: "Trajet",
  zoneDepot: "Zone de dépôt",
  runButton: "Lancer la simulation",
  resultsHeading: "Mesures de la simulation",
  genericErrorFallback: "Vérifie les paramètres de la simulation.",
  fieldPositiveErrorTemplate: "{name} doit être un nombre positif.",
  fieldLabels: {
    volumeM3: "Volume de gravats (m³)",
    truckCapacityM3: "Capacité d’un engin (m³)",
    truckCount: "Nombre d’engins",
    routeDistanceM: "Distance d’un trajet (m)",
    loadingMinutes: "Chargement (min)",
    unloadingMinutes: "Déchargement (min)",
    maneuverMinutes: "Manœuvre (min)",
    travelMinutesPerKm: "Temps de trajet (min/km)",
    consumptionPerKm: "Consommation pédagogique (unité/km)",
  } satisfies Record<keyof EvacuationScenario, string>,
  fieldErrorNames: {
    volumeM3: "Le volume",
    truckCapacityM3: "La capacité",
    truckCount: "Le nombre d’engins",
    routeDistanceM: "La distance",
    loadingMinutes: "Le temps de chargement",
    unloadingMinutes: "Le temps de déchargement",
    maneuverMinutes: "Le temps de manœuvre",
    travelMinutesPerKm: "Le temps de trajet",
    consumptionPerKm: "La consommation",
  } satisfies Record<keyof EvacuationScenario, string>,
  measureLabels: {
    volumeM3: "Volume évacué",
    numberOfTrips: "Nombre de trajets",
    distanceM: "Distance totale",
    elapsedMinutes: "Temps total",
    pedagogicalConsumption: "Consommation pédagogique",
  } satisfies Record<keyof EvacuationMeasures, string>,
} as const;

