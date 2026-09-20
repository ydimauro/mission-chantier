import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { WarningIcon } from "@/components/ui/icons";
import { LIMITES_DU_MODELE_LABEL } from "@content/engine";

/**
 * Rappelle qu’une simulation est une représentation simplifiée, jamais une
 * reproduction exacte de la réalité (docs/SPEC.md § 51).
 */
export function LimitesDuModele({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<WarningIcon />} label={LIMITES_DU_MODELE_LABEL} accentClassName="text-sim">
      {children}
    </PhaseBlock>
  );
}
