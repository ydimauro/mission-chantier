import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { LightbulbIcon } from "@/components/ui/icons";
import { HYPOTHESE_LABEL, HYPOTHESE_RAPPEL_CAHIER } from "@content/engine";

/**
 * Invite à formuler une hypothèse. Ne remplace jamais le cahier : la
 * réponse de l’élève est écrite sur papier (docs/SPEC.md § 12), pas ici.
 */
export function Hypothese({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<LightbulbIcon />} label={HYPOTHESE_LABEL}>
      <p>{children}</p>
      <p className="mt-2 text-sm italic text-ink-muted">{HYPOTHESE_RAPPEL_CAHIER}</p>
    </PhaseBlock>
  );
}
