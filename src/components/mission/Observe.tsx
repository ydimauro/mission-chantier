import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { EyeIcon } from "@/components/ui/icons";
import { OBSERVE_LABEL } from "@content/engine";

export function Observe({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<EyeIcon />} label={OBSERVE_LABEL}>
      {children}
    </PhaseBlock>
  );
}
