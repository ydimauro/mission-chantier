import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { CheckCircleIcon } from "@/components/ui/icons";
import { BILAN_MISSION_LABEL } from "@content/engine";

export function BilanMission({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<CheckCircleIcon />} label={BILAN_MISSION_LABEL} accentClassName="text-brand">
      {children}
    </PhaseBlock>
  );
}
