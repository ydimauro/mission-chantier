"use client";

import { useState } from "react";
import { useTeacherWorkspace } from "@/providers/teacher-workspace-provider";
import {
  CORRECTION_POLICIES,
  createDefaultClassConfig,
  buildClassConfigFileName,
  type CorrectionPolicy,
} from "@/lib/schemas/class-config";
import { triggerTextDownload } from "@/lib/download";
import { CLASS_CONFIG_SECTION } from "@content/pages/teacher";
import { LEVELS, LEVEL_LABELS, type Level } from "@content/config";

const POLICY_LABELS: Record<CorrectionPolicy, string> = {
  manuelle: CLASS_CONFIG_SECTION.policyManual,
  "auto-des-que-possible": CLASS_CONFIG_SECTION.policyAutoAsap,
};

export function ClassConfigPanel() {
  const { classConfig, setClassConfig, importClassConfig } = useTeacherWorkspace();
  const [classe, setClasse] = useState(classConfig?.classe ?? "");
  const [niveau, setNiveau] = useState<Level>(classConfig?.niveau ?? "5e");
  const [importError, setImportError] = useState<string | null>(null);

  function handleCreate() {
    if (!classe.trim()) return;
    setClassConfig(createDefaultClassConfig(classe, niveau));
  }

  function handleExport() {
    if (!classConfig) return;
    triggerTextDownload(buildClassConfigFileName(classConfig.classe), JSON.stringify(classConfig, null, 2));
  }

  async function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = importClassConfig(text);
    setImportError(result.ok ? null : (result.message ?? "invalid-schema"));
    event.target.value = "";
  }

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h2 className="text-base font-semibold text-ink">{CLASS_CONFIG_SECTION.title}</h2>

      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm text-ink">
          {CLASS_CONFIG_SECTION.classeLabel}
          <input
            type="text"
            value={classe}
            onChange={(event) => setClasse(event.target.value)}
            placeholder="4E2"
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-ink">
          {CLASS_CONFIG_SECTION.niveauLabel}
          <select
            value={niveau}
            onChange={(event) => setNiveau(event.target.value as Level)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {LEVEL_LABELS[level]}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {CLASS_CONFIG_SECTION.createButton}
        </button>
      </div>

      {classConfig ? (
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm text-ink">
            {CLASS_CONFIG_SECTION.durationLabel}
            <input
              type="number"
              min={1}
              max={45}
              value={classConfig.standardDurationMinutes}
              onChange={(event) =>
                setClassConfig({
                  ...classConfig,
                  standardDurationMinutes: Number(event.target.value) || classConfig.standardDurationMinutes,
                })
              }
              className="w-24 rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-ink">
            {CLASS_CONFIG_SECTION.policyLabel}
            <select
              value={classConfig.correctionPolicy}
              onChange={(event) =>
                setClassConfig({
                  ...classConfig,
                  correctionPolicy: event.target.value as CorrectionPolicy,
                })
              }
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
            >
              {CORRECTION_POLICIES.map((policy) => (
                <option key={policy} value={policy}>
                  {POLICY_LABELS[policy]}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          disabled={!classConfig}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink disabled:opacity-50"
        >
          {CLASS_CONFIG_SECTION.exportButton}
        </button>

        <label className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-ink">
          {CLASS_CONFIG_SECTION.importButton}
          <input
            type="file"
            accept=".mcconfig,application/json"
            onChange={(event) => void handleImportChange(event)}
            className="sr-only"
          />
        </label>
      </div>

      {importError ? (
        <p role="alert" className="mt-2 text-sm text-brand">
          {importError}
        </p>
      ) : null}
    </section>
  );
}
