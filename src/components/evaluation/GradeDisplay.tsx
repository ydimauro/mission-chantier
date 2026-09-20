import { NOTE_NON_CALCULABLE, NOTE_PROVISOIRE } from "@content/evaluations";
import { roundToHalfPoint, type GradeResult } from "@/lib/evaluations/grade";

/**
 * Affiche la note /20, au demi-point (docs/SPEC.md § 27). Le calcul interne
 * garde sa précision ; seul l’affichage est arrondi ici.
 */
export function GradeDisplay({ grade }: { grade: GradeResult }) {
  if (grade.noteOn20 === null) {
    return <p className="text-base text-ink-muted">{NOTE_NON_CALCULABLE}</p>;
  }

  return (
    <p className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-ink">{roundToHalfPoint(grade.noteOn20)} / 20</span>
      {grade.provisional ? (
        <span className="text-sm font-medium text-accent">{NOTE_PROVISOIRE}</span>
      ) : null}
    </p>
  );
}
