"use client";

import { useEffect, useState } from "react";
import { ClockIcon } from "@/components/ui/icons";
import { MISSION_TIMER_LABEL } from "@content/engine";
import { formatElapsedMinutes } from "@/lib/mission/timer";

type MissionTimerProps = {
  paused?: boolean;
  onTick?: (elapsedSeconds: number) => void;
};

/**
 * Indicateur de temps discret, jamais un compte à rebours anxiogène
 * (docs/SPEC.md § 8). Sert de repère, pas de limite bloquante.
 */
export function MissionTimer({ paused = false, onTick }: MissionTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => {
        const next = current + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [paused, onTick]);

  return (
    <p className="flex items-center gap-2 text-sm text-ink-muted">
      <ClockIcon />
      <span>
        {MISSION_TIMER_LABEL} : {formatElapsedMinutes(elapsedSeconds)}
      </span>
    </p>
  );
}
