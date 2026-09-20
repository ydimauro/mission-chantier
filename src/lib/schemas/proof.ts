import { z } from "zod";
import { COMPETENCY_IDS } from "@content/competencies";

/**
 * Preuve de compétence (docs/EVALUATIONS.md § 5, docs/SPEC.md § 29). Une
 * preuve formative est un indicateur de progression ; une preuve
 * "summative" ou "final" est plus forte et seule éligible au calcul du
 * niveau de maîtrise (docs/COMPETENCES.md § 5).
 */

export const ASSESSMENT_KINDS = ["diagnostic", "formative", "summative", "final"] as const;
export type AssessmentKind = (typeof ASSESSMENT_KINDS)[number];

export const competencyProofSchema = z.object({
  competency: z.enum(COMPETENCY_IDS),
  mission: z.string().min(1),
  assessmentType: z.enum(ASSESSMENT_KINDS),
  context: z.string().min(1),
  score: z.number().min(0).max(1),
  date: z.string().min(1),
  seed: z.string().optional(),
  // Vrai si la preuve provient d’une situation de transfert (mission finale
  // ou mission intégrative, docs/COMPETENCES.md § 5 règle 4). Posé par le
  // code de mission qui crée la preuve, jamais déduit ici.
  transfer: z.boolean(),
});

export type CompetencyProof = z.infer<typeof competencyProofSchema>;
