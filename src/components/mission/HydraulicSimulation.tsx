"use client";

import { useState } from "react";
import { HYDRAULIC_SIMULATION_LABELS } from "@content/engine";
import {
  simulateHydraulicMovement,
  type HydraulicMeasures,
} from "@/lib/simulation/hydraulic";

type HydraulicSimulationProps = {
  onSimulationRun?: (measures: HydraulicMeasures) => void;
};

export function HydraulicSimulation({ onSimulationRun }: HydraulicSimulationProps) {
  const [pressureBar, setPressureBar] = useState(120);
  const [flowLitersPerMinute, setFlowLitersPerMinute] = useState(20);
  const [measures, setMeasures] = useState<HydraulicMeasures | null>(null);

  function runSimulation() {
    const nextMeasures = simulateHydraulicMovement({ pressureBar, flowLitersPerMinute });
    setMeasures(nextMeasures);
    onSimulationRun?.(nextMeasures);
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
        {HYDRAULIC_SIMULATION_LABELS.pressure}: {pressureBar}
        <input
          type="range"
          min="60"
          max="180"
          step="10"
          value={pressureBar}
          onChange={(event) => {
            setPressureBar(Number(event.target.value));
            setMeasures(null);
          }}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
        {HYDRAULIC_SIMULATION_LABELS.flow}: {flowLitersPerMinute}
        <input
          type="range"
          min="10"
          max="40"
          step="5"
          value={flowLitersPerMinute}
          onChange={(event) => {
            setFlowLitersPerMinute(Number(event.target.value));
            setMeasures(null);
          }}
        />
      </label>

      <button
        type="button"
        onClick={runSimulation}
        className="w-fit rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast"
      >
        {HYDRAULIC_SIMULATION_LABELS.run}
      </button>

      {measures ? (
        <div aria-live="polite" className="rounded-md border border-border bg-surface-muted p-3">
          <p className="font-semibold">{HYDRAULIC_SIMULATION_LABELS.measuresTitle}</p>
          <p className="mt-1 text-sm text-ink">
            {HYDRAULIC_SIMULATION_LABELS.speed}: {measures.movementSpeed} {HYDRAULIC_SIMULATION_LABELS.unit}
          </p>
        </div>
      ) : null}
    </div>
  );
}