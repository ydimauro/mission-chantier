/**
 * Formatage du temps écoulé sur une mission. Affichage volontairement en
 * minutes seulement (pas de secondes) pour rester discret et non anxiogène
 * (docs/SPEC.md § 8 : application « rassurante », jamais un compte à
 * rebours). Sert aussi de repère indicatif pour le professeur au regard des
 * profils de durée (docs/SEANCES_5E.md / docs/SEANCES_4E.md), jamais comme
 * une limite bloquante imposée à l’élève.
 */
export function formatElapsedMinutes(elapsedSeconds: number): string {
  const minutes = Math.floor(Math.max(elapsedSeconds, 0) / 60);
  return minutes < 1 ? "moins d’une minute" : `${minutes} min`;
}
