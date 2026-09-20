"use client";

import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import { CLASS_SYNTHESIS_LABELS } from "@content/pages/teacher";
import { COMPETENCY_IDS } from "@content/competencies";
import { MASTERY_LEVEL_LABELS } from "@content/evaluations";
import { computeClassSynthesis } from "@/lib/teacher/synthesis";
import { buildClassSynthesisCsv, buildPronoteCsv } from "@/lib/teacher/csv";
import { buildCorrectedFilesZipBlob } from "@/lib/teacher/export-bundle";
import { triggerTextDownload } from "@/lib/download";
import { roundToHalfPoint } from "@/lib/evaluations/grade";

function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ClassSynthesisPanel() {
  const { students, teacherKey, classConfig } = useTeacherWorkspace();

  if (!teacherKey || students.length === 0) return null;

  const rows = computeClassSynthesis(students, teacherKey);
  const classeLabel = classConfig?.classe ?? "classe";

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h2 className="text-base font-semibold text-ink">{CLASS_SYNTHESIS_LABELS.title}</h2>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-ink-muted">
              <th className="py-2 pr-3">Code</th>
              <th className="py-2 pr-3">Classe</th>
              {COMPETENCY_IDS.map((competency) => (
                <th key={competency} className="py-2 pr-3">
                  {competency}
                </th>
              ))}
              <th className="py-2 pr-3">Note /20</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.studentCode} className="border-b border-border">
                <td className="py-2 pr-3 font-medium text-ink">{row.studentCode}</td>
                <td className="py-2 pr-3 text-ink">{row.classe}</td>
                {COMPETENCY_IDS.map((competency) => (
                  <td key={competency} className="py-2 pr-3 text-ink">
                    {MASTERY_LEVEL_LABELS[row.mastery[competency]]}
                  </td>
                ))}
                <td className="py-2 pr-3 text-ink">
                  {row.grade.noteOn20 === null
                    ? "-"
                    : `${roundToHalfPoint(row.grade.noteOn20)}${row.grade.provisional ? " *" : ""}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.some((row) => row.grade.provisional) ? (
          <p className="mt-2 text-xs text-ink-muted">* Note provisoire.</p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => triggerTextDownload(`synthese-${classeLabel}.csv`, buildClassSynthesisCsv(rows))}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {CLASS_SYNTHESIS_LABELS.exportCsvButton}
        </button>
        <button
          type="button"
          onClick={() => triggerTextDownload(`pronote-${classeLabel}.csv`, buildPronoteCsv(rows))}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {CLASS_SYNTHESIS_LABELS.exportPronoteButton}
        </button>
        <button
          type="button"
          onClick={() => downloadBlob(`mission-chantier-${classeLabel}-corriges.zip`, buildCorrectedFilesZipBlob(students))}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {CLASS_SYNTHESIS_LABELS.exportZipButton}
        </button>
      </div>

      <p className="mt-2 text-xs text-ink-muted">{CLASS_SYNTHESIS_LABELS.pronoteWarning}</p>
    </section>
  );
}
