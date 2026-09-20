import { BookIcon } from "@/components/ui/icons";
import { SOURCE_FICTIVE_LABEL, SOURCE_LABEL } from "@content/engine";
import { isProperlySourced } from "@/lib/pedagogy/sourcing";

type SourceProps = {
  /** Référence exacte de la source (ex. « Selon la Ville de Givors, 2026 »).
   * Absente => la donnée est annoncée comme fictive (docs/SPEC.md § 52). */
  citation?: string;
};

export function Source({ citation }: SourceProps) {
  return (
    <p className="flex items-center gap-2 text-sm text-ink-muted">
      <BookIcon />
      {isProperlySourced(citation) ? (
        <span>
          {SOURCE_LABEL} : {citation}
        </span>
      ) : (
        <span className="italic">{SOURCE_FICTIVE_LABEL}</span>
      )}
    </p>
  );
}
