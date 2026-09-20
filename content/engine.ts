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
