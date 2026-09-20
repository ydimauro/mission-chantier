import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";
import type { CompetencyProof } from "@/lib/schemas/proof";
import { findAnswerKeyEntry, type TeacherKey } from "@/lib/schemas/teacher-key";

/**
 * Construit les preuves de compétence à partir des dépôts corrigés
 * (docs/EVALUATIONS.md § 5, docs/SPEC.md § 41 « création des preuves de
 * compétences »). Une preuve par item corrigé et déclaré dans le `.mctkey`.
 */
export function deriveProofsFromSubmissions(
  submissions: readonly AssessmentSubmission[],
  key: TeacherKey,
  correctionDate: string,
): CompetencyProof[] {
  const proofs: CompetencyProof[] = [];

  for (const submission of submissions) {
    if (submission.status !== "corrected" || submission.score === undefined) continue;

    const entry = findAnswerKeyEntry(key, submission.missionId, submission.itemId);
    if (!entry) continue;

    proofs.push({
      competency: entry.competency,
      mission: submission.missionId,
      assessmentType: submission.kind,
      context: submission.itemId,
      score: submission.score,
      date: correctionDate,
      seed: submission.seed,
      transfer: entry.transfer,
    });
  }

  return proofs;
}

/**
 * Fusionne de nouvelles preuves dans les preuves existantes d’un élève, en
 * remplaçant une preuve déjà connue pour le même contexte (mission + item)
 * plutôt que de la dupliquer à chaque nouvelle correction.
 */
export function mergeProofs(
  existing: readonly CompetencyProof[],
  incoming: readonly CompetencyProof[],
): CompetencyProof[] {
  const byKey = new Map<string, CompetencyProof>();

  for (const proof of existing) {
    byKey.set(`${proof.mission}:${proof.context}`, proof);
  }
  for (const proof of incoming) {
    byKey.set(`${proof.mission}:${proof.context}`, proof);
  }

  return Array.from(byKey.values());
}
