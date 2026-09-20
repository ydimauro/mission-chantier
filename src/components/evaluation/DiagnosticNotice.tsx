import { QuestionIcon } from "@/components/ui/icons";
import { DIAGNOSTIC_NOTICE } from "@content/evaluations";

/** Message obligatoire avant toute activité diagnostique (docs/SPEC.md § 21). */
export function DiagnosticNotice() {
  return (
    <p className="flex items-center gap-2 rounded-md border border-border bg-surface-muted px-4 py-3 text-sm text-ink-muted">
      <QuestionIcon />
      {DIAGNOSTIC_NOTICE}
    </p>
  );
}
