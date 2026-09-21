export type Comparator = "<" | "<=" | ">" | ">=";

/**
 * Exécution qualitative d’un programme « SI distance {comparator} seuil
 * ALORS action » (5E-09, 5E-10). Ne porte aucun texte : le composant
 * appelant construit le message à partir de `@content/engine`.
 */
export function evaluateCondition(distanceM: number, comparator: Comparator, thresholdM: number): boolean {
  switch (comparator) {
    case "<":
      return distanceM < thresholdM;
    case "<=":
      return distanceM <= thresholdM;
    case ">":
      return distanceM > thresholdM;
    case ">=":
      return distanceM >= thresholdM;
  }
}
