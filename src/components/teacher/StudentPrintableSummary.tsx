import { COMPETENCY_IDS } from "@content/competencies";
import { MASTERY_LEVEL_LABELS } from "@content/evaluations";
import { COPYRIGHT_NOTICE } from "@content/config";
import { roundToHalfPoint, type GradeResult } from "@/lib/evaluations/grade";
import type { MasteryLevel } from "@/lib/evaluations/mastery";

type StudentPrintableSummaryProps = {
  studentCode: string;
  classe: string;
  grade: GradeResult;
  mastery: Record<(typeof COMPETENCY_IDS)[number], MasteryLevel>;
};

/**
 * Bilan individuel imprimable (docs/SPEC.md § 41). Masqué à l’écran,
 * affiché uniquement à l’impression (`print:block`), pour laisser
 * l’enseignant utiliser l’impression native du navigateur (docs/SPEC.md § 54).
 */
export function StudentPrintableSummary({ studentCode, classe, grade, mastery }: StudentPrintableSummaryProps) {
  return (
    <div className="hidden print:block">
      <h1 className="text-xl font-bold">Bilan individuel : {studentCode}</h1>
      <p>Classe : {classe}</p>
      <p>
        Note : {grade.noteOn20 === null ? "non calculable pour le moment" : `${roundToHalfPoint(grade.noteOn20)} / 20`}
        {grade.provisional ? " (provisoire)" : ""}
      </p>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-1 text-left">Compétence</th>
            <th className="border border-black p-1 text-left">Niveau de maîtrise</th>
          </tr>
        </thead>
        <tbody>
          {COMPETENCY_IDS.map((competency) => (
            <tr key={competency}>
              <td className="border border-black p-1">{competency}</td>
              <td className="border border-black p-1">{MASTERY_LEVEL_LABELS[mastery[competency]]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs">{COPYRIGHT_NOTICE}</p>
    </div>
  );
}
