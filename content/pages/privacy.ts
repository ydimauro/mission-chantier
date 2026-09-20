/**
 * Contenu de la page /privacy (docs/RGPD.md § 5).
 * Rédigé pour être compréhensible par un collégien.
 */

export type PrivacySection = {
  title: string;
  paragraphs: readonly string[];
};

export const PRIVACY_TITLE = "Tes données et Mission Chantier";

export const PRIVACY_INTRO =
  "Aucune donnée élève n’est transmise sur Internet. Elle reste sur le poste, sur le réseau de l’établissement ou dans les fichiers enregistrés volontairement.";

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    title: "Quelles données sont enregistrées ?",
    paragraphs: [
      "Ton code élève (par exemple 4E2-017), ta classe et ton niveau.",
      "Les missions terminées, tes réponses, tes choix et tes résultats de simulation.",
      "Tes preuves de compétences et ta progression dans le parcours.",
      "Aucun nom, aucun prénom et aucune information médicale ne sont jamais enregistrés par l’application.",
    ],
  },
  {
    title: "Où sont stockées ces données ?",
    paragraphs: [
      "Sur cet ordinateur, dans une mémoire technique du navigateur appelée IndexedDB.",
      "Dans un fichier que tu enregistres toi-même, avec l’extension .mcjson.",
      "Jamais sur un serveur distant, jamais sur Internet.",
    ],
  },
  {
    title: "Comment récupérer mes données ?",
    paragraphs: [
      "Ton fichier .mcjson est le moyen principal de garder ta progression. Enregistre-le à l’endroit indiqué par ton professeur ou ta professeure.",
      "Tu peux réimporter ce fichier plus tard, sur ce poste ou sur un autre poste du collège, pour retrouver ta progression.",
    ],
  },
  {
    title: "Comment supprimer mes données ?",
    paragraphs: [
      "Le bouton « Effacer mes données locales », disponible sur cette page, supprime la mémoire technique de ce poste après une confirmation.",
      "Cette suppression n’efface pas un fichier .mcjson que tu as déjà enregistré ailleurs (clé USB, dossier personnel) : ce fichier reste sous ta responsabilité et celle de ta famille.",
    ],
  },
];

export const PRIVACY_ERASE_BUTTON_LABEL = "Effacer mes données locales";

export const PRIVACY_ERASE_CONFIRM_LABEL =
  "Es-tu sûr ou sûre de vouloir effacer tes données locales sur ce poste ? Cette action est définitive.";

export const PRIVACY_ERASE_CONFIRM_BUTTON_LABEL = "Oui, effacer définitivement";

export const PRIVACY_ERASE_CANCEL_BUTTON_LABEL = "Annuler";

export const PRIVACY_ERASE_SUCCESS_MESSAGE =
  "Tes données locales sur ce poste ont été effacées.";
