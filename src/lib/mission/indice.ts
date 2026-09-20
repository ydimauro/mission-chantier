/**
 * Logique pure des aides progressives à trois niveaux (docs/PEDAGOGIE.md
 * § 7.3). `level` est le nombre d’indices déjà révélés (0 à `max`).
 */
export function nextIndiceLevel(level: number, max: number): number {
  return Math.min(level + 1, max);
}

export function isIndiceExhausted(level: number, max: number): boolean {
  return level >= max;
}
