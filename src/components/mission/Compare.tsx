import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { CompareIcon } from "@/components/ui/icons";
import { COMPARE_LABEL } from "@content/engine";

export function Compare({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<CompareIcon />} label={COMPARE_LABEL}>
      {children}
    </PhaseBlock>
  );
}
