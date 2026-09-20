/**
 * Règle de sourçage des données techniques et des faits Givors
 * (docs/SPEC.md § 3, § 52, tests pédagogiques n° 7-8 de § 64) : toute donnée
 * présentée comme réelle doit être sourcée, sinon annoncée comme fictive.
 */
export function isProperlySourced(citation: string | undefined | null): boolean {
  return typeof citation === "string" && citation.trim().length > 0;
}
