import type { ReactNode } from "react";
import { FlaskIcon } from "@/components/ui/icons";
import { SIMULATION_PEDAGOGIQUE_BADGE, SIMULATION_VALEURS_SIMPLIFIEES } from "@content/engine";

type SimulationPedagogiqueProps = {
  children: ReactNode;
  /** Affiche « Les valeurs ont été simplifiées pour permettre l’activité. » */
  valeursSimplifiees?: boolean;
};

/**
 * Encadre un contenu de simulation (Quartier des Ateliers), avec le
 * bandeau obligatoire « Simulation pédagogique » (docs/SPEC.md § 6.2).
 */
export function SimulationPedagogique({
  children,
  valeursSimplifiees = false,
}: SimulationPedagogiqueProps) {
  return (
    <section className="overflow-hidden rounded-md border border-sim">
      <div className="flex items-center gap-2 bg-sim px-4 py-2 text-sm font-semibold text-sim-contrast">
        <FlaskIcon />
        {SIMULATION_PEDAGOGIQUE_BADGE}
      </div>
      <div className="bg-surface p-4 text-base leading-7 text-ink">
        {children}
        {valeursSimplifiees ? (
          <p className="mt-3 text-sm italic text-ink-muted">{SIMULATION_VALEURS_SIMPLIFIEES}</p>
        ) : null}
      </div>
    </section>
  );
}
