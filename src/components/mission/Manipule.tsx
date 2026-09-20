import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { SlidersIcon } from "@/components/ui/icons";
import { MANIPULE_LABEL } from "@content/engine";

/**
 * Zone de manipulation, de test ou de simulation. Ce composant ne fournit
 * que le cadre visuel commun ; l’interaction elle-même (glisser-déposer,
 * moteur de simulation, etc.) est fournie en `children` par chaque mission.
 */
export function Manipule({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<SlidersIcon />} label={MANIPULE_LABEL}>
      {children}
    </PhaseBlock>
  );
}
