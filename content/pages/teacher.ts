/**
 * Contenu de l’espace professeur `/teacher` (docs/SPEC.md § 41). Destiné à
 * l’enseignant, pas à l’élève : le ton et le niveau de détail sont adaptés
 * en conséquence.
 */

export const TEACHER_PAGE_TITLE = "Espace professeur";

export const TEACHER_INTRO =
  "Cet espace fonctionne entièrement sur ce poste, sans connexion à un serveur. Rien n’est envoyé sur Internet.";

export const CLASS_CONFIG_SECTION = {
  title: "Configuration de la classe (.mcconfig)",
  classeLabel: "Classe",
  niveauLabel: "Niveau",
  durationLabel: "Durée standard (minutes)",
  policyLabel: "Politique de correction",
  policyManual: "Manuelle",
  policyAutoAsap: "Automatique dès que possible",
  createButton: "Créer la configuration",
  exportButton: "Exporter le .mcconfig",
  importButton: "Importer un .mcconfig",
} as const;

export const TEACHER_KEY_SECTION = {
  title: "Corrigé enseignant (.mctkey)",
  importButton: "Importer le .mctkey",
  loaded: "Corrigé chargé.",
  notLoaded: "Aucun corrigé chargé. Importe un fichier .mctkey pour corriger automatiquement.",
} as const;

export const STUDENT_IMPORT_SECTION = {
  title: "Fichiers élèves (.mcjson)",
  importButton: "Importer un ou plusieurs fichiers élèves",
  emptyState: "Aucun fichier élève importé pour le moment.",
} as const;

export const STUDENT_LIST_LABELS = {
  studentCode: "Code élève",
  classe: "Classe",
  pendingCount: "Items en attente",
  note: "Note",
  select: "Ouvrir",
} as const;

export const STUDENT_DETAIL_LABELS = {
  autoCorrectButton: "Lancer la correction automatique",
  pendingItemsTitle: "Réponses à corriger",
  noPendingItems: "Aucune réponse en attente de correction humaine.",
  scoreLabel: "Points attribués",
  submitScoreButton: "Valider la correction",
  accommodationLabel: "Aménagement individuel",
  exportButton: "Exporter ce fichier corrigé",
  printableSummaryButton: "Bilan imprimable",
  revisionLabel: "Révision",
} as const;

export const CLASS_SYNTHESIS_LABELS = {
  title: "Synthèse de classe",
  exportCsvButton: "Exporter la synthèse (CSV)",
  exportPronoteButton: "Exporter la vue Pronote (CSV)",
  exportZipButton: "Exporter tous les fichiers corrigés (ZIP)",
  pronoteWarning: "Aucune connexion directe à Pronote : ce fichier s’importe ou se recopie manuellement.",
} as const;

export const IMPORT_ERROR_LABELS = {
  invalidJson: "Ce fichier n’est pas un fichier valide.",
  invalidSchema: "Ce fichier est incomplet ou abîmé.",
  unsupportedVersionTemplate: "Ce fichier a été créé par une version plus récente de l’application (version {version}).",
} as const;
