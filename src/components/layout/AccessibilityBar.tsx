"use client";

import { usePreferences } from "@/providers/preferences-provider";
import { ACCESSIBILITY_BAR_LABEL, ACCESSIBILITY_LABELS } from "@content/navigation";
import { GaugeIcon, MoonIcon, ProjectorIcon, SunIcon } from "@/components/ui/icons";

const toggleBaseClass =
  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors";

function toggleClass(active: boolean): string {
  return active
    ? `${toggleBaseClass} border-brand bg-brand text-brand-contrast`
    : `${toggleBaseClass} border-border bg-surface text-ink-muted hover:text-ink`;
}

export function AccessibilityBar() {
  const {
    preferences,
    setTheme,
    toggleDyslexiaFriendly,
    cycleTextScale,
    toggleProjectorMode,
    togglePerformanceMode,
  } = usePreferences();

  return (
    <div
      role="group"
      aria-label={ACCESSIBILITY_BAR_LABEL}
      className="flex flex-wrap items-center gap-2"
    >
      <button
        type="button"
        aria-pressed={preferences.theme === "light"}
        onClick={() => setTheme("light")}
        className={toggleClass(preferences.theme === "light")}
      >
        <SunIcon />
        {ACCESSIBILITY_LABELS.lightMode}
      </button>

      <button
        type="button"
        aria-pressed={preferences.theme === "dark"}
        onClick={() => setTheme("dark")}
        className={toggleClass(preferences.theme === "dark")}
      >
        <MoonIcon />
        {ACCESSIBILITY_LABELS.darkMode}
      </button>

      <button
        type="button"
        aria-pressed={preferences.dyslexiaFriendly}
        onClick={toggleDyslexiaFriendly}
        className={toggleClass(preferences.dyslexiaFriendly)}
      >
        <span aria-hidden="true" className="flex items-baseline">
          <span className="text-xs">A</span>
          <span className="text-base">a</span>
        </span>
        {ACCESSIBILITY_LABELS.dyslexiaFriendly}
      </button>

      <button
        type="button"
        onClick={cycleTextScale}
        className={toggleClass(preferences.textScale !== 100)}
        aria-label={`${ACCESSIBILITY_LABELS.textScale} : ${preferences.textScale} %`}
      >
        <span aria-hidden="true" className="flex items-baseline">
          <span className="text-xs">A</span>
          <span className="text-lg">A</span>
        </span>
        {preferences.textScale} %
      </button>

      <button
        type="button"
        aria-pressed={preferences.projectorMode}
        onClick={toggleProjectorMode}
        className={toggleClass(preferences.projectorMode)}
      >
        <ProjectorIcon />
        {ACCESSIBILITY_LABELS.projectorMode}
      </button>

      <button
        type="button"
        aria-pressed={preferences.performanceMode}
        onClick={togglePerformanceMode}
        className={toggleClass(preferences.performanceMode)}
      >
        <GaugeIcon />
        {ACCESSIBILITY_LABELS.performanceMode}
      </button>
    </div>
  );
}
