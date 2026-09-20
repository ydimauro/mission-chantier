"use client";

import { useState } from "react";
import { useProgression } from "@/providers/progression-provider";
import { formatMessage } from "@/lib/format-message";
import {
  DASHBOARD_LABELS,
  FIREFOX_FALLBACK,
  FOLDER_LABELS,
  IMPORT_RESULT_MESSAGES,
  SWITCH_STUDENT_CONFIRM,
} from "@content/pages/progression";
import { LEVEL_LABELS } from "@content/config";
import { CANCEL_LABEL } from "@content/navigation";
import type { StudentFile } from "@/lib/schemas/student-file";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date);
}

type Notice = { tone: "success" | "error"; message: string } | null;

export function ProgressionDashboard({ file }: { file: StudentFile }) {
  const {
    fileSystemAccessSupported,
    folderLinked,
    saveNow,
    exportFile,
    importFile,
    chooseFolder,
    switchStudent,
  } = useProgression();

  const [notice, setNotice] = useState<Notice>(null);
  const [confirmingSwitch, setConfirmingSwitch] = useState(false);
  const [firefoxSaved, setFirefoxSaved] = useState(false);

  async function handleSave() {
    const result = await saveNow();
    setNotice(
      result.ok
        ? { tone: "success", message: DASHBOARD_LABELS.saveSuccess }
        : { tone: "error", message: result.reason },
    );
  }

  async function handleChooseFolder() {
    const result = await chooseFolder();
    if (result.ok) {
      setNotice({ tone: "success", message: FOLDER_LABELS.folderActive });
    } else if (result.reason === "permission-denied") {
      setNotice({ tone: "error", message: FOLDER_LABELS.permissionDenied });
    }
  }

  async function handleImportChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const selected = input.files?.[0];
    if (!selected) return;

    const text = await selected.text();
    const outcome = await importFile(text);
    input.value = "";

    switch (outcome.type) {
      case "adopted":
        setNotice({ tone: "success", message: IMPORT_RESULT_MESSAGES.adopted });
        break;
      case "up-to-date":
        setNotice({ tone: "success", message: IMPORT_RESULT_MESSAGES.upToDate });
        break;
      case "conflict":
      case "wrong-file":
        // Un bandeau dédié (ConflictDialog / WrongFileNotice) prend le relais.
        break;
      case "error":
        if (outcome.error.type === "invalid-json") {
          setNotice({ tone: "error", message: IMPORT_RESULT_MESSAGES.invalidJson });
        } else if (outcome.error.type === "invalid-schema") {
          setNotice({ tone: "error", message: IMPORT_RESULT_MESSAGES.invalidSchema });
        } else {
          setNotice({
            tone: "error",
            message: formatMessage(IMPORT_RESULT_MESSAGES.unsupportedVersionTemplate, {
              version: String(outcome.error.foundVersion),
            }),
          });
        }
        break;
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border border-border bg-surface p-5">
        <dt className="text-sm text-ink-muted">{DASHBOARD_LABELS.studentCode}</dt>
        <dd className="text-sm font-semibold text-ink">{file.studentCode}</dd>

        <dt className="text-sm text-ink-muted">{DASHBOARD_LABELS.classe}</dt>
        <dd className="text-sm font-semibold text-ink">{file.classe}</dd>

        <dt className="text-sm text-ink-muted">{DASHBOARD_LABELS.niveau}</dt>
        <dd className="text-sm font-semibold text-ink">{LEVEL_LABELS[file.niveau]}</dd>

        <dt className="text-sm text-ink-muted">{DASHBOARD_LABELS.revision}</dt>
        <dd className="text-sm font-semibold text-ink">{file.revision}</dd>

        <dt className="text-sm text-ink-muted">{DASHBOARD_LABELS.updatedAt}</dt>
        <dd className="text-sm font-semibold text-ink">{formatUpdatedAt(file.updatedAt)}</dd>
      </dl>

      {notice ? (
        <p
          role="status"
          className={
            notice.tone === "success"
              ? "rounded-md border border-border bg-surface-muted px-4 py-3 text-sm text-ink"
              : "rounded-md border border-brand bg-surface-muted px-4 py-3 text-sm text-ink"
          }
        >
          {notice.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void handleSave()}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {DASHBOARD_LABELS.saveNow}
        </button>

        <button
          type="button"
          onClick={exportFile}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          {DASHBOARD_LABELS.exportFile}
        </button>

        <label className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-muted">
          {DASHBOARD_LABELS.importFile}
          <input
            type="file"
            accept=".mcjson,application/json"
            onChange={(event) => void handleImportChange(event)}
            className="sr-only"
          />
        </label>
      </div>

      {fileSystemAccessSupported ? (
        <div className="rounded-md border border-border bg-surface-muted p-4">
          <button
            type="button"
            onClick={() => void handleChooseFolder()}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
          >
            {FOLDER_LABELS.chooseFolder}
          </button>
          {folderLinked ? (
            <p className="mt-2 text-sm text-ink-muted">{FOLDER_LABELS.folderActive}</p>
          ) : null}
        </div>
      ) : (
        <div className="rounded-md border border-border bg-surface-muted p-4">
          <p className="text-sm text-ink-muted">{FIREFOX_FALLBACK.notice}</p>
          {firefoxSaved ? (
            <p className="mt-2 text-sm text-ink">{FIREFOX_FALLBACK.confirmedMessage}</p>
          ) : (
            <button
              type="button"
              onClick={() => setFirefoxSaved(true)}
              className="mt-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
            >
              {FIREFOX_FALLBACK.confirmLabel}
            </button>
          )}
        </div>
      )}

      {confirmingSwitch ? (
        <div className="rounded-md border border-border bg-surface-muted p-4">
          <p className="text-sm text-ink">{SWITCH_STUDENT_CONFIRM}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={switchStudent}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
            >
              {DASHBOARD_LABELS.switchStudent}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingSwitch(false)}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
            >
              {CANCEL_LABEL}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmingSwitch(true)}
          className="self-start text-sm font-medium text-ink-muted underline hover:text-ink"
        >
          {DASHBOARD_LABELS.switchStudent}
        </button>
      )}
    </div>
  );
}
