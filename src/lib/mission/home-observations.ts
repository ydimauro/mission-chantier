import { HOME_CONTENT } from "@content/pages/placeholders";

const validChoiceIds = new Set<string>(HOME_CONTENT.observationChoices.map((choice) => choice.id));

/** Lit uniquement les choix connus, transmis par l’accueil après l’identification. */
export function parseHomeObservations(value: string | null): string[] {
  if (!value) return [];

  return [...new Set(value.split(",").filter((choice) => validChoiceIds.has(choice)))];
}
