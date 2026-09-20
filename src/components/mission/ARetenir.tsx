import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { StarIcon } from "@/components/ui/icons";
import { A_RETENIR_LABEL } from "@content/engine";

export function ARetenir({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<StarIcon />} label={A_RETENIR_LABEL} accentClassName="text-accent">
      {children}
    </PhaseBlock>
  );
}
