import { z } from "zod";
import { COMPETENCY_IDS } from "@content/competencies";
import { ASSESSMENT_KINDS } from "@/lib/schemas/proof";

/**
 * Format du fichier enseignant `.mctkey` (docs/SPEC.md § 24.3). Contient les
 * corrigés, barèmes et seuils de maîtrise. N’est jamais transmis aux élèves,
 * jamais intégré au build public, jamais versionné (voir teacher-data/README.md).
 *
 * Le format précis d’une réponse (`answer`) dépend du type d’item et du
 * contenu réel des missions (ÉTAPE 6 et suivantes) : il reste générique ici,
 * comme `responses` dans le fichier élève (src/lib/schemas/assessment-submission.ts).
 */

export const CURRENT_TEACHER_KEY_SCHEMA_VERSION = 1;

const masteryThresholdsSchema = z.object({
  minAverageForFragile: z.number().min(0).max(1),
  minAverageForSatisfaisante: z.number().min(0).max(1),
  minAverageForTresBonne: z.number().min(0).max(1),
});

const scoringRuleSchema = z.object({
  /** "auto" : corrigeable automatiquement ; "human" : nécessite une lecture par le professeur. */
  type: z.enum(["auto", "human"]),
  points: z.number().min(0),
});

// Tableau plutôt que dictionnaire : l’index de variante retrouvé par
// `pickVariant`/`seedToIndex` (src/lib/evaluations/seed.ts) désigne sans
// ambiguïté la même variante que celle montrée à l’élève avec la même graine.
const answerVariantSchema = z.object({
  id: z.string().min(1),
  answer: z.unknown(),
});

const answerKeyEntrySchema = z.object({
  missionId: z.string().min(1),
  itemId: z.string().min(1),
  /** Compétence évaluée par cet item (docs/SPEC.md § 15). */
  competency: z.enum(COMPETENCY_IDS),
  kind: z.enum(ASSESSMENT_KINDS),
  /** Vrai si cet item constitue une situation de transfert (docs/COMPETENCES.md § 5, règle 4). */
  transfer: z.boolean(),
  variantAnswers: z.array(answerVariantSchema).min(1),
  scoring: scoringRuleSchema,
});

export const teacherKeySchema = z.object({
  schemaVersion: z.literal(1),
  entries: z.array(answerKeyEntrySchema),
  /** Permet d’ajuster les seuils de maîtrise sans les coder en dur côté élève. */
  masteryThresholds: masteryThresholdsSchema.optional(),
});

export type TeacherKey = z.infer<typeof teacherKeySchema>;
export type AnswerKeyEntry = z.infer<typeof answerKeyEntrySchema>;
export type AnswerVariant = z.infer<typeof answerVariantSchema>;

export function findAnswerKeyEntry(
  key: TeacherKey,
  missionId: string,
  itemId: string,
): AnswerKeyEntry | null {
  return key.entries.find((entry) => entry.missionId === missionId && entry.itemId === itemId) ?? null;
}

export type TeacherKeyParseError =
  | { type: "invalid-json" }
  | { type: "invalid-schema"; issues: readonly string[] }
  | { type: "unsupported-version"; foundVersion: number };

export type TeacherKeyParseResult =
  | { ok: true; key: TeacherKey }
  | { ok: false; error: TeacherKeyParseError };

function readSchemaVersion(data: unknown): number | null {
  if (data !== null && typeof data === "object" && "schemaVersion" in data) {
    const value = (data as { schemaVersion: unknown }).schemaVersion;
    return typeof value === "number" ? value : null;
  }
  return null;
}

export function parseTeacherKeyJson(raw: string): TeacherKeyParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: { type: "invalid-json" } };
  }

  const foundVersion = readSchemaVersion(data);
  if (foundVersion !== null && foundVersion > CURRENT_TEACHER_KEY_SCHEMA_VERSION) {
    return { ok: false, error: { type: "unsupported-version", foundVersion } };
  }

  const parsed = teacherKeySchema.safeParse(data);
  if (!parsed.success) {
    return {
      ok: false,
      error: { type: "invalid-schema", issues: parsed.error.issues.map((issue) => issue.message) },
    };
  }

  return { ok: true, key: parsed.data };
}
