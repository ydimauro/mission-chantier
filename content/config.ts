/**
 * Constante centrale de l’application (docs/SPEC.md § 56).
 * Toute l’application référence ces valeurs, jamais de texte en dur.
 */

export const APP_NAME = "Mission Chantier";

export const APP_TAGLINE = "Givors se transforme";

export const APP_AUTHOR = "Yann Di Mauro";

export const APP_YEAR = 2026;

export const COPYRIGHT_TEXT = `© ${APP_YEAR} - ${APP_NAME} - ${APP_AUTHOR}`;

export const COPYRIGHT_NOTICE =
  "Document pédagogique interne. Ne constitue pas un diplôme officiel.";

export const SCHOOL_CONTEXT = "Collège REP - Givors";

export type Level = "5e" | "4e";

export const LEVELS: readonly Level[] = ["5e", "4e"];

export const LEVEL_LABELS: Record<Level, string> = {
  "5e": "5e",
  "4e": "4e",
};
