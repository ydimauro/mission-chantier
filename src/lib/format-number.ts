/**
 * Formate un nombre selon la convention française (virgule décimale),
 * pour tout texte affiché à l’élève (AGENTS.md règle 19).
 */
export function formatFrenchNumber(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits }).format(value);
}
