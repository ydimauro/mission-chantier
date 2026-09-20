import {
  CheckCircleIcon,
  GaugeIcon,
  QuestionIcon,
  StarIcon,
  WarningIcon,
} from "@/components/ui/icons";
import { MASTERY_LEVEL_LABELS } from "@content/evaluations";
import type { MasteryLevel } from "@/lib/evaluations/mastery";

const ICONS_BY_LEVEL: Record<MasteryLevel, typeof QuestionIcon> = {
  "non-evaluee": QuestionIcon,
  insuffisante: WarningIcon,
  fragile: GaugeIcon,
  satisfaisante: CheckCircleIcon,
  "tres-bonne": StarIcon,
};

const ACCENT_BY_LEVEL: Record<MasteryLevel, string> = {
  "non-evaluee": "text-ink-muted",
  insuffisante: "text-accent",
  fragile: "text-accent",
  satisfaisante: "text-brand",
  "tres-bonne": "text-brand",
};

/**
 * Affiche un niveau de maîtrise avec icône ET texte : jamais la couleur
 * seule (docs/SPEC.md § 28, § 43).
 */
export function MasteryBadge({ level }: { level: MasteryLevel }) {
  const Icon = ICONS_BY_LEVEL[level];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium ${ACCENT_BY_LEVEL[level]}`}
    >
      <Icon />
      {MASTERY_LEVEL_LABELS[level]}
    </span>
  );
}
