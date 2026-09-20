import type { ReactNode } from "react";
import { MapPinIcon } from "@/components/ui/icons";
import { SITUATION_REELLE_BADGE } from "@content/engine";

/**
 * Encadre un contenu appuyé sur le réel (Givors), avec le bandeau
 * obligatoire « Situation réelle » (docs/SPEC.md § 6.1). Les faits utilisés
 * à l’intérieur doivent provenir de `docs/sources/givors/` (AGENTS.md
 * règle 5) ; ce composant ne fournit que le cadre, jamais le contenu.
 */
export function SituationReelle({ children }: { children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-md border border-real">
      <div className="flex items-center gap-2 bg-real px-4 py-2 text-sm font-semibold text-real-contrast">
        <MapPinIcon />
        {SITUATION_REELLE_BADGE}
      </div>
      <div className="bg-surface p-4 text-base leading-7 text-ink">{children}</div>
    </section>
  );
}
