import type { ReactNode } from "react";
import { PhaseBlock } from "@/components/mission/PhaseBlock";
import { FlagIcon } from "@/components/ui/icons";
import { CONSIGNE_LABEL } from "@content/engine";

/**
 * Une consigne = une action principale (docs/PEDAGOGIE.md § 7.1). N’affiche
 * jamais plusieurs instructions à la fois : la mission enchaîne plusieurs
 * `Consigne` successives plutôt que d’en cumuler le texte dans une seule.
 */
export function Consigne({ children }: { children: ReactNode }) {
  return (
    <PhaseBlock icon={<FlagIcon />} label={CONSIGNE_LABEL} accentClassName="text-brand">
      <p className="text-lg font-medium">{children}</p>
    </PhaseBlock>
  );
}
