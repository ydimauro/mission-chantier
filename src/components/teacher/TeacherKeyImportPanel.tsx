"use client";

import { useState } from "react";
import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import { TEACHER_KEY_SECTION } from "@content/pages/teacher";
import { CheckCircleIcon } from "@/components/ui/icons";

export function TeacherKeyImportPanel() {
  const { teacherKey, importTeacherKey } = useTeacherWorkspace();
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = importTeacherKey(text);
    setError(result.ok ? null : (result.message ?? "invalid-schema"));
    event.target.value = "";
  }

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h2 className="text-base font-semibold text-ink">{TEACHER_KEY_SECTION.title}</h2>

      <label className="mt-3 inline-block cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-ink">
        {TEACHER_KEY_SECTION.importButton}
        <input
          type="file"
          accept=".mctkey,application/json"
          onChange={(event) => void handleChange(event)}
          className="sr-only"
        />
      </label>

      <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
        {teacherKey ? <CheckCircleIcon /> : null}
        {teacherKey ? TEACHER_KEY_SECTION.loaded : TEACHER_KEY_SECTION.notLoaded}
      </p>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-brand">
          {error}
        </p>
      ) : null}
    </section>
  );
}
