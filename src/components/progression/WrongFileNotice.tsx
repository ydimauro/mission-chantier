"use client";

import { useProgression } from "@/providers/progression-provider";
import { formatMessage } from "@/lib/format-message";
import { WRONG_FILE_MESSAGES } from "@content/pages/progression";

type WrongFileNoticeProps = {
  sessionCode: string;
  fileCode: string;
};

export function WrongFileNotice({ sessionCode, fileCode }: WrongFileNoticeProps) {
  const { cancelWrongFile, confirmSwitchToWrongFile } = useProgression();

  return (
    <div role="alertdialog" className="mx-auto max-w-md rounded-md border border-brand bg-surface-muted p-6">
      <p className="font-semibold text-ink">{WRONG_FILE_MESSAGES.title}</p>
      <p className="mt-2 text-sm text-ink-muted">
        {formatMessage(WRONG_FILE_MESSAGES.helpTemplate, { fileCode, sessionCode })}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={cancelWrongFile}
          className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
        >
          {WRONG_FILE_MESSAGES.cancel}
        </button>
        <button
          type="button"
          onClick={() => void confirmSwitchToWrongFile()}
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
        >
          {WRONG_FILE_MESSAGES.switchToFile}
        </button>
      </div>
    </div>
  );
}
