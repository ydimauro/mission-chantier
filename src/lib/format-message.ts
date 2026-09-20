/**
 * Remplace les jetons `{clé}` d’un message modèle par une valeur, sans
 * dépendance d’internationalisation. Garde les textes de /content en
 * chaînes simples (vérifiables par test/typography.test.ts) plutôt qu’en
 * fonctions.
 */
export function formatMessage(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
