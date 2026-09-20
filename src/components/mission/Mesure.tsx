import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { GaugeIcon } from "@/components/ui/icons";
import { MESURE_LABEL } from "@content/engine";

export function Mesure({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<GaugeIcon />} label={MESURE_LABEL}>
      {children}
    </PhaseBlock>
  );
}
