import type { AssessmentAccommodation, StudentFile } from "@/lib/schemas/student-file";
import { touchStudentFile } from "@/lib/progression/model";

/**
 * Applique un aménagement individuel (docs/SPEC.md § 31). Toute
 * modification enseignant augmente `revision` (docs/SPEC.md § 33). Aucun
 * motif n’est jamais demandé ni enregistré : `AssessmentAccommodation` ne
 * porte que `standard | reduced | split`.
 */
export function applyAccommodation(
  file: StudentFile,
  accommodation: AssessmentAccommodation,
): StudentFile {
  if (file.accommodation === accommodation) return file;
  return touchStudentFile({ ...file, accommodation });
}
