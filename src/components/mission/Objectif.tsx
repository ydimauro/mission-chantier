import { TargetIcon } from "@/components/ui/icons";
import { OBJECTIF_LABEL_PLURIEL, OBJECTIF_LABEL_SINGULIER } from "@content/engine";

type ObjectifProps = {
  items: readonly string[];
};

export function Objectif({ items }: ObjectifProps) {
  const label = items.length > 1 ? OBJECTIF_LABEL_PLURIEL : OBJECTIF_LABEL_SINGULIER;

  return (
    <section className="rounded-md border border-border bg-surface p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        <TargetIcon />
        {label}
      </h3>
      <ul className="mt-2 flex flex-col gap-1.5 text-base leading-7 text-ink">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-brand">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
