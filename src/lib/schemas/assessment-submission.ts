import { z } from "zod";
import { ASSESSMENT_KINDS } from "@/lib/schemas/proof";

/**
 * Dépôt d’une évaluation par l’élève (docs/SPEC.md § 21-23). Le contenu
 * précis de `responses` dépend du type d’item (QCM, protocole de test,
 * programme, etc.), défini mission par mission à partir de l’ÉTAPE 6 : il
 * reste volontairement générique ici.
 *
 * `status` passe de "pending" à "corrected" lorsque le professeur réinjecte
 * un résultat corrigé depuis `/teacher` (docs/SPEC.md § 25-26) ; c’est cette
 * même structure qui porte alors le « résultat corrigé » (docs/SPEC.md § 24.1).
 */

export const assessmentSubmissionSchema = z.object({
  missionId: z.string().min(1),
  itemId: z.string().min(1),
  kind: z.enum(ASSESSMENT_KINDS),
  /** Sélectionne la variante de l’item, pour reproductibilité (docs/SPEC.md § 24.3). */
  seed: z.string().optional(),
  responses: z.unknown(),
  submittedAt: z.string().min(1),
  status: z.enum(["pending", "corrected"]),
  /** Uniquement renseigné une fois `status: "corrected"`. */
  score: z.number().min(0).max(1).optional(),
});

export type AssessmentSubmission = z.infer<typeof assessmentSubmissionSchema>;
