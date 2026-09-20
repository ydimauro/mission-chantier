/**
 * Logique pure des préférences d’affichage (thème, police adaptée, taille du
 * texte, mode vidéoprojecteur, mode performance). Séparée du contexte React
 * pour rester testable sans rendu de composant (test/preferences.test.ts).
 */

export type Theme = "light" | "dark";
export type TextScale = 100 | 125 | 150;

export type Preferences = {
  theme: Theme | null;
  dyslexiaFriendly: boolean;
  textScale: TextScale;
  projectorMode: boolean;
  performanceMode: boolean;
};

export const DEFAULT_PREFERENCES: Preferences = {
  theme: null,
  dyslexiaFriendly: false,
  textScale: 100,
  projectorMode: false,
  performanceMode: false,
};

export const TEXT_SCALE_STEPS: readonly TextScale[] = [100, 125, 150];

export function nextTextScale(current: TextScale): TextScale {
  const currentIndex = TEXT_SCALE_STEPS.indexOf(current);
  const nextIndex = (currentIndex + 1) % TEXT_SCALE_STEPS.length;
  return TEXT_SCALE_STEPS[nextIndex] ?? 100;
}
