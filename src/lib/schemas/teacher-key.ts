import { z } from "zod";

/**
 * Format du fichier enseignant `.mctkey` (docs/SPEC.md § 24.3). Contient les
 * corrigés, barèmes et seuils de maîtrise. N’est jamais transmis aux élèves,
 * jamais intégré au build public, jamais versionné (voir teacher-data/README.md).
 *
 * Le format précis d’un corrigé (`answer`) dépend du type d’item et du
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

const answerKeyEntrySchema = z.object({
  missionId: z.string().min(1),
  itemId: z.string().min(1),
  /** Corrigé par variante (clé = identifiant de variante ou seed). */
  variantAnswers: z.record(z.string(), z.unknown()),
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
