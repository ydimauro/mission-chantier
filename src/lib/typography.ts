/**
 * Vérification de la typographie française (docs/SPEC.md § 49, AGENTS.md règle 19).
 * Interdits dans les contenus destinés aux élèves ou au professeur :
 * apostrophe droite ('), guillemet droit ("), tiret cadratin (—).
 * Utilisé par test/typography.test.ts sur les contenus de /content.
 */

export type TypographyViolation = {
  character: "'" | '"' | "—";
  index: number;
};

const FORBIDDEN_CHARACTERS: TypographyViolation["character"][] = ["'", '"', "—"];

export function findTypographyViolations(text: string): TypographyViolation[] {
  const violations: TypographyViolation[] = [];

  for (let index = 0; index < text.length; index += 1) {
    const character = text.charAt(index);
    if ((FORBIDDEN_CHARACTERS as string[]).includes(character)) {
      violations.push({
        character: character as TypographyViolation["character"],
        index,
      });
    }
  }

  return violations;
}

export function isTypographyClean(text: string): boolean {
  return findTypographyViolations(text).length === 0;
}

/**
 * Extrait récursivement toutes les chaînes de caractères d’une valeur de
 * contenu (objet, tableau, chaîne) afin de les vérifier en une seule passe.
 */
export function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStrings(item));
  }

  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap((item) => collectStrings(item));
  }

  return [];
}
