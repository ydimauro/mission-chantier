"use client";

import { useState } from "react";
import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import { STUDENT_DETAIL_LABELS } from "@content/pages/teacher";
import { findAnswerKeyEntry } from "@/lib/schemas/teacher-key";
import { triggerTextDownload } from "@/lib/download";
import { buildStudentFileName } from "@/lib/progression/model";
import { ASSESSMENT_ACCOMMODATIONS, type AssessmentAccommodation } from "@/lib/schemas/student-file";
import { computeStudentGrade, computeStudentMastery } from "@/lib/teacher/synthesis";
import { StudentPrintableSummary } from "@/components/teacher/StudentPrintableSummary";

function PendingItemRow({ studentCode, missionId, itemId }: { studentCode: string; missionId: string; itemId: string }) {
  const { teacherKey, gradeSubmission } = useTeacherWorkspace();
  const entry = teacherKey ? findAnswerKeyEntry(teacherKey, missionId, itemId) : null;
  const maxPoints = entry?.scoring.points ?? 1;
  const [points, setPoints] = useState(0);

  function submit() {
    gradeSubmission(studentCode, missionId, itemId, maxPoints > 0 ? points / maxPoints : 0);
  }

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-surface-muted p-3">
      <span className="text-sm text-ink">
        {missionId} · {itemId}
      </span>
      <label className="flex items-center gap-2 text-sm text-ink">
        {STUDENT_DETAIL_LABELS.scoreLabel}
        <input
          type="number"
          min={0}
          max={maxPoints}
          step={0.5}
          value={points}
          onChange={(event) => setPoints(Math.min(maxPoints, Math.max(0, Number(event.target.value))))}
          className="w-20 rounded-md border border-border bg-surface px-2 py-1 text-sm"
        />
        / {maxPoints}
      </label>
      <button
        type="button"
        onClick={submit}
        className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-contrast"
      >
        {STUDENT_DETAIL_LABELS.submitScoreButton}
      </button>
    </li>
  );
}

export function StudentDetail({ studentCode }: { studentCode: string }) {
  const { students, teacherKey, autoCorrectStudent, setAccommodationForStudent } = useTeacherWorkspace();
  const student = students.find((candidate) => candidate.studentCode === studentCode);

  if (!student) return null;

  const pendingItems = student.assessments.filter((submission) => submission.status === "pending");

  function handleExport() {
    triggerTextDownload(buildStudentFileName(student!.studentCode), JSON.stringify(student, null, 2));
  }

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-ink">{student.studentCode}</h2>
        <span className="text-sm text-ink-muted">
          {STUDENT_DETAIL_LABELS.revisionLabel} : {student.revision}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-ink">
          {STUDENT_DETAIL_LABELS.accommodationLabel}
          <select
            value={student.accommodation}
            onChange={(event) =>
              setAccommodationForStudent(student.studentCode, event.target.value as AssessmentAccommodation)
            }
            className="rounded-md border border-border bg-surface px-2 py-1 text-sm"
          >
            {ASSESSMENT_ACCOMMODATIONS.map((accommodation) => (
              <option key={accommodation} value={accommodation}>
                {accommodation}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => autoCorrectStudent(student.studentCode)}
          disabled={!teacherKey}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink disabled:opacity-50"
        >
          {STUDENT_DETAIL_LABELS.autoCorrectButton}
        </button>

        <button
          type="button"
          onClick={handleExport}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {STUDENT_DETAIL_LABELS.exportButton}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          disabled={!teacherKey}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink disabled:opacity-50"
        >
          {STUDENT_DETAIL_LABELS.printableSummaryButton}
        </button>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-ink">{STUDENT_DETAIL_LABELS.pendingItemsTitle}</h3>
      {pendingItems.length === 0 ? (
        <p className="mt-1 text-sm text-ink-muted">{STUDENT_DETAIL_LABELS.noPendingItems}</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {pendingItems.map((submission) => (
            <PendingItemRow
              key={`${submission.missionId}:${submission.itemId}`}
              studentCode={student.studentCode}
              missionId={submission.missionId}
              itemId={submission.itemId}
            />
          ))}
        </ul>
      )}

      {teacherKey ? (
        <StudentPrintableSummary
          studentCode={student.studentCode}
          classe={student.classe}
          grade={computeStudentGrade(student, teacherKey)}
          mastery={computeStudentMastery(student, teacherKey.masteryThresholds)}
        />
      ) : null}
    </section>
  );
}
