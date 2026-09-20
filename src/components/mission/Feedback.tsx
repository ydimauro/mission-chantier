import type { ReactNode } from "react";
import { CheckCircleIcon, LightbulbIcon } from "@/components/ui/icons";
import { FEEDBACK_RETRY_BUTTON_LABEL } from "@content/engine";

type FeedbackProps = {
  /** « success » après une réussite, « retry » après une erreur à corriger. */
  tone: "success" | "retry";
  /**
   * Message reformulé et orienté (docs/PEDAGOGIE.md § 7.4) : jamais un
   * simple « Faux ». Exemples : « Observe à nouveau le rôle de cet élément. »
   */
  children: ReactNode;
  onRetry?: () => void;
};

export function Feedback({ tone, children, onRetry }: FeedbackProps) {
  const accentClassName = tone === "success" ? "text-brand" : "text-sim";

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-md border p-4 ${
        tone === "success" ? "border-brand" : "border-sim"
      } bg-surface-muted`}
    >
      <span className={accentClassName}>
        {tone === "success" ? <CheckCircleIcon /> : <LightbulbIcon />}
      </span>
      <div className="flex-1">
        <p className="text-base text-ink">{children}</p>
        {tone === "retry" && onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            {FEEDBACK_RETRY_BUTTON_LABEL}
          </button>
        ) : null}
      </div>
    </div>
  );
}
