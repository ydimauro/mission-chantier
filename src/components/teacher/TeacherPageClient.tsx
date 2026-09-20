"use client";

import { useState } from "react";
import { TeacherWorkspaceProvider } from "@/providers/teacher-workspace-provider";
import { TEACHER_INTRO, TEACHER_PAGE_TITLE } from "@content/pages/teacher";
import { ClassConfigPanel } from "@/components/teacher/ClassConfigPanel";
import { TeacherKeyImportPanel } from "@/components/teacher/TeacherKeyImportPanel";
import { StudentImportPanel } from "@/components/teacher/StudentImportPanel";
import { StudentList } from "@/components/teacher/StudentList";
import { StudentDetail } from "@/components/teacher/StudentDetail";
import { ClassSynthesisPanel } from "@/components/teacher/ClassSynthesisPanel";

function TeacherWorkspace() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-12 print:max-w-full print:px-0">
      <div className="print:hidden">
        <h1 className="text-2xl font-bold text-ink">{TEACHER_PAGE_TITLE}</h1>
        <p className="mt-1 text-sm text-ink-muted">{TEACHER_INTRO}</p>
      </div>

      <div className="grid gap-6 print:hidden sm:grid-cols-2">
        <ClassConfigPanel />
        <TeacherKeyImportPanel />
      </div>

      <div className="print:hidden">
        <StudentImportPanel />
      </div>

      <div className="print:hidden">
        <StudentList selected={selected} onSelect={setSelected} />
      </div>

      {selected ? <StudentDetail studentCode={selected} /> : null}

      <div className="print:hidden">
        <ClassSynthesisPanel />
      </div>
    </div>
  );
}

export function TeacherPageClient() {
  return (
    <TeacherWorkspaceProvider>
      <TeacherWorkspace />
    </TeacherWorkspaceProvider>
  );
}
