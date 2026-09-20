"use client";

import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import { STUDENT_IMPORT_SECTION, STUDENT_LIST_LABELS } from "@content/pages/teacher";
import { computeStudentGrade } from "@/lib/teacher/synthesis";
import { roundToHalfPoint } from "@/lib/evaluations/grade";

type StudentListProps = {
  selected: string | null;
  onSelect: (studentCode: string) => void;
};

export function StudentList({ selected, onSelect }: StudentListProps) {
  const { students, teacherKey } = useTeacherWorkspace();

  if (students.length === 0) {
    return <p className="text-sm text-ink-muted">{STUDENT_IMPORT_SECTION.emptyState}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left text-ink-muted">
          <th className="py-2 pr-3">{STUDENT_LIST_LABELS.studentCode}</th>
          <th className="py-2 pr-3">{STUDENT_LIST_LABELS.classe}</th>
          <th className="py-2 pr-3">{STUDENT_LIST_LABELS.pendingCount}</th>
          <th className="py-2 pr-3">{STUDENT_LIST_LABELS.note}</th>
          <th className="py-2" />
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          const pending = student.assessments.filter((submission) => submission.status === "pending").length;
          const grade = teacherKey ? computeStudentGrade(student, teacherKey) : null;

          return (
            <tr
              key={student.studentCode}
              className={
                selected === student.studentCode
                  ? "border-b border-border bg-surface-muted"
                  : "border-b border-border"
              }
            >
              <td className="py-2 pr-3 font-medium text-ink">{student.studentCode}</td>
              <td className="py-2 pr-3 text-ink">{student.classe}</td>
              <td className="py-2 pr-3 text-ink">{pending}</td>
              <td className="py-2 pr-3 text-ink">
                {grade?.noteOn20 !== null && grade?.noteOn20 !== undefined
                  ? `${roundToHalfPoint(grade.noteOn20)} / 20${grade.provisional ? " *" : ""}`
                  : "-"}
              </td>
              <td className="py-2">
                <button
                  type="button"
                  onClick={() => onSelect(student.studentCode)}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink hover:bg-surface-muted"
                >
                  {STUDENT_LIST_LABELS.select}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
