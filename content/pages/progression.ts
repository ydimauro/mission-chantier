/**
 * Contenu de l’espace « Ma progression » : identification, sauvegarde,
 * import / export, conflits cache / fichier (docs/SAUVEGARDE.md).
 * Les modèles contenant `{...}` sont complétés avec formatMessage()
 * (src/lib/format-message.ts) afin de rester détectables par le test de
 * typographie française (test/typography.test.ts).
 */

export const IDENTITY_FORM = {
  title: "Qui es-tu ?",
  intro:
    "Ton professeur ou ta professeure t’a donné un code élève. Il ressemble à 4E2-017.",
  studentCodeLabel: "Code élève",
  classeLabel: "Classe",
  niveauLabel: "Niveau",
  submitLabel: "Commencer",
  studentCodeRequired: "Indique ton code élève.",
  classeRequired: "Indique ta classe.",
  createError: "Impossible de créer ta progression. Réessaie dans quelques instants.",
} as const;

export const DASHBOARD_LABELS = {
  studentCode: "Code élève",
  classe: "Classe",
  niveau: "Niveau",
  revision: "Révision",
  updatedAt: "Dernière sauvegarde",
  saveNow: "Enregistrer ma progression",
  saveSuccess: "Ta progression a été enregistrée.",
  exportFile: "Exporter mon fichier .mcjson",
  importFile: "Importer un fichier .mcjson",
  switchStudent: "Changer d’élève",
} as const;

export const SWITCH_STUDENT_CONFIRM =
  "Veux-tu changer d’élève sur ce poste ? Ta progression reste enregistrée sur cet ordinateur, tu pourras la retrouver en entrant à nouveau ton code.";

export const FOLDER_LABELS = {
  chooseFolder: "Choisir mon dossier de sauvegarde",
  folderActive: "Sauvegarde automatique activée dans ton dossier.",
  permissionDenied: "Le dossier de sauvegarde n’est plus accessible. Choisis-le à nouveau.",
} as const;

export const FIREFOX_FALLBACK = {
  notice:
    "Ce navigateur ne permet pas la sauvegarde automatique dans un dossier. Exporte ton fichier de progression à la fin de la séance.",
  confirmLabel: "J’ai enregistré mon fichier.",
  confirmedMessage: "Merci. N’oublie pas de réimporter ce fichier la prochaine fois.",
} as const;

export const CONFLICT_MESSAGES = {
  cacheNewer: {
    message: "Une progression plus récente existe sur cet ordinateur.",
    keepCache: "Reprendre la progression de cet ordinateur",
    useFile: "Utiliser le fichier importé",
  },
  fileNewer: {
    message: "Une progression plus récente a été trouvée dans ce fichier.",
    useFile: "Utiliser le fichier",
    keepCache: "Conserver la progression de ce poste",
  },
  diverged: {
    message:
      "Deux versions différentes de la même progression ont été détectées. Demande au professeur avant de continuer.",
    acknowledge: "Compris",
  },
} as const;

export const WRONG_FILE_MESSAGES = {
  title: "Ce fichier correspond à un autre identifiant.",
  helpTemplate:
    "Le fichier importé appartient à {fileCode}, mais tu es actuellement identifié ou identifiée comme {sessionCode}.",
  cancel: "Annuler l’import",
  switchToFile: "Ce n’est pas une erreur, changer d’élève",
} as const;

export const IMPORT_RESULT_MESSAGES = {
  invalidJson: "Ce fichier n’est pas un fichier de progression valide.",
  invalidSchema: "Ce fichier de progression est incomplet ou abîmé.",
  unsupportedVersionTemplate:
    "Ce fichier a été créé par une version plus récente de l’application (version {version}). Utilise une version à jour pour l’ouvrir.",
  upToDate: "Ton fichier correspond déjà à la progression de ce poste.",
  adopted: "Fichier importé avec succès.",
} as const;

export const PROGRESSION_PAGE_TITLE = "Ma progression";

export const LOADING_LABEL = "Chargement de ta progression…";

export const LOAD_ERROR_MESSAGES = {
  title: "Impossible de charger ta progression",
  body: "Une erreur technique a empêché l’application de lire ta progression enregistrée sur cet ordinateur. Tes données ne sont pas perdues : elles restent enregistrées sur cet ordinateur.",
  retry: "Réessayer",
  reload: "Recharger la page",
  startNew: "Commencer une nouvelle progression",
  startNewHelp:
    "Ton ancienne progression reste enregistrée sur cet ordinateur. Tu pourras la retrouver plus tard en entrant à nouveau le même code élève.",
} as const;
