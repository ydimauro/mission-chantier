import { CheckCircleIcon } from "@/components/ui/icons";
import { SOMMATIVE_SUBMITTED_NOTICE } from "@content/evaluations";

/**
 * Message obligatoire à la remise d’une sommative (docs/SPEC.md § 23) :
 * aucune correction n’est jamais montrée côté élève à ce moment.
 */
export function SommativeSubmittedNotice() {
  return (
    <p className="flex items-center gap-2 rounded-md border border-brand bg-surface-muted px-4 py-3 text-sm text-ink">
      <CheckCircleIcon />
      {SOMMATIVE_SUBMITTED_NOTICE}
    </p>
  );
}
