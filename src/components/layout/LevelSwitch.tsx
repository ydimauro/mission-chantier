"use client";

import { useLevel } from "@/providers/level-provider";
import { LEVELS, LEVEL_LABELS } from "@content/config";
import { LEVEL_SWITCH_LABEL } from "@content/navigation";

export function LevelSwitch() {
  const { level, setLevel } = useLevel();

  return (
    <div
      role="group"
      aria-label={LEVEL_SWITCH_LABEL}
      className="flex items-center gap-1 rounded-md border border-border bg-surface-muted p-0.5"
    >
      {LEVELS.map((candidate) => {
        const isActive = candidate === level;
        return (
          <button
            key={candidate}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLevel(candidate)}
            className={
              isActive
                ? "rounded-sm bg-accent px-3 py-1.5 text-sm font-semibold text-slate-900"
                : "rounded-sm px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-ink"
            }
          >
            {LEVEL_LABELS[candidate]}
          </button>
        );
      })}
    </div>
  );
}
