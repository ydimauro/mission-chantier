"use client";

import { useState } from "react";
import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import { STUDENT_IMPORT_SECTION } from "@content/pages/teacher";

export function StudentImportPanel() {
  const { importStudentFiles } = useTeacherWorkspace();
  const [errors, setErrors] = useState<{ fileName: string; message: string }[]>([]);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = await Promise.all(
      Array.from(fileList).map(async (file) => ({ name: file.name, content: await file.text() })),
    );
    const summary = importStudentFiles(files);
    setErrors(summary.errors);
    event.target.value = "";
  }

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h2 className="text-base font-semibold text-ink">{STUDENT_IMPORT_SECTION.title}</h2>

      <label className="mt-3 inline-block cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-ink">
        {STUDENT_IMPORT_SECTION.importButton}
        <input
          type="file"
          accept=".mcjson,application/json"
          multiple
          onChange={(event) => void handleChange(event)}
          className="sr-only"
        />
      </label>

      {errors.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-1 text-sm text-brand">
          {errors.map((error) => (
            <li key={error.fileName}>
              {error.fileName} : {error.message}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
