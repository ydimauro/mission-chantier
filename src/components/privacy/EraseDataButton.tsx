"use client";

import { useState } from "react";
import { clearLocalData } from "@/lib/storage";
import {
  PRIVACY_ERASE_BUTTON_LABEL,
  PRIVACY_ERASE_CANCEL_BUTTON_LABEL,
  PRIVACY_ERASE_CONFIRM_BUTTON_LABEL,
  PRIVACY_ERASE_CONFIRM_LABEL,
  PRIVACY_ERASE_SUCCESS_MESSAGE,
} from "@content/pages/privacy";

type Status = "idle" | "confirming" | "done";

export function EraseDataButton() {
  const [status, setStatus] = useState<Status>("idle");

  if (status === "done") {
    return (
      <p role="status" className="rounded-md border border-border bg-surface-muted px-4 py-3 text-ink">
        {PRIVACY_ERASE_SUCCESS_MESSAGE}
      </p>
    );
  }

  if (status === "confirming") {
    return (
      <div className="flex flex-col gap-3 rounded-md border border-border bg-surface-muted px-4 py-3">
        <p className="text-ink">{PRIVACY_ERASE_CONFIRM_LABEL}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              clearLocalData();
              setStatus("done");
            }}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
          >
            {PRIVACY_ERASE_CONFIRM_BUTTON_LABEL}
          </button>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink"
          >
            {PRIVACY_ERASE_CANCEL_BUTTON_LABEL}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStatus("confirming")}
      className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-muted"
    >
      {PRIVACY_ERASE_BUTTON_LABEL}
    </button>
  );
}
