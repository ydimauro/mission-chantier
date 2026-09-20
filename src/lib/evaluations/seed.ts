/**
 * Variantes et graine (seed) d’un item d’évaluation (docs/SPEC.md § 24.3,
 * § 29). Une graine dérivée du code élève et de la mission sélectionne une
 * variante de façon déterministe : le même élève retrouve toujours la même
 * variante en rechargeant la page, et le `.mctkey` peut faire correspondre
 * chaque variante à son corrigé.
 */

export function createSeed(studentCode: string, missionId: string, itemId: string): string {
  return `${studentCode}:${missionId}:${itemId}`;
}

/** Hachage simple (FNV-1a) : déterministe, sans dépendance, suffisant pour choisir une variante. */
function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function seedToIndex(seed: string, variantCount: number): number {
  if (variantCount <= 0) {
    throw new Error("variantCount doit être supérieur à 0.");
  }
  return hashString(seed) % variantCount;
}

export function pickVariant<T>(variants: readonly T[], seed: string): T {
  const index = seedToIndex(seed, variants.length);
  const variant = variants[index];
  if (variant === undefined) {
    throw new Error("Aucune variante disponible pour cette graine.");
  }
  return variant;
}
