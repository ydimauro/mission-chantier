"use client";

import { useState } from "react";
import {
  InvalidScenarioFieldError,
  simulateEvacuation,
  type EvacuationMeasures,
  type EvacuationScenario,
} from "@/lib/simulation/evacuation";
import { EVACUATION_SIMULATION_LABELS } from "@content/engine";
import { formatMessage } from "@/lib/format-message";
import { formatFrenchNumber } from "@/lib/format-number";

const DEFAULT_SCENARIO: EvacuationScenario = {
  volumeM3: 18,
  truckCapacityM3: 6,
  truckCount: 1,
  routeDistanceM: 500,
  loadingMinutes: 4,
  unloadingMinutes: 3,
  maneuverMinutes: 2,
  travelMinutesPerKm: 6,
  consumptionPerKm: 1.5,
};

type EvacuationSimulationProps = {
  initialScenario?: Partial<EvacuationScenario>;
  onSimulationRun?: (measures: EvacuationMeasures) => void;
};

const INTEGER_FIELDS: Array<keyof EvacuationScenario> = [
  "volumeM3",
  "truckCapacityM3",
  "truckCount",
  "routeDistanceM",
];

function describeError(error: unknown): string {
  if (error instanceof InvalidScenarioFieldError) {
    return formatMessage(EVACUATION_SIMULATION_LABELS.fieldPositiveErrorTemplate, {
      name: EVACUATION_SIMULATION_LABELS.fieldErrorNames[error.field],
    });
  }
  return EVACUATION_SIMULATION_LABELS.genericErrorFallback;
}

export function EvacuationSimulation({
  initialScenario,
  onSimulationRun,
}: EvacuationSimulationProps) {
  const [scenario, setScenario] = useState<EvacuationScenario>({
    ...DEFAULT_SCENARIO,
    ...initialScenario,
  });
  const [measures, setMeasures] = useState<EvacuationMeasures | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateScenario(field: keyof EvacuationScenario, value: string) {
    const numericValue = Number(value);
    setScenario((current) => ({ ...current, [field]: numericValue }));
    setMeasures(null);
    setError(null);
  }

  function runSimulation() {
    try {
      const nextMeasures = simulateEvacuation(scenario);
      setMeasures(nextMeasures);
      setError(null);
      onSimulationRun?.(nextMeasures);
    } catch (simulationError) {
      setMeasures(null);
      setError(describeError(simulationError));
    }
  }

  return (
    <div className="space-y-5" data-testid="evacuation-simulation">
      <div
        aria-label={EVACUATION_SIMULATION_LABELS.planLabel}
        className="grid min-h-40 grid-cols-[1fr_0.7fr_1fr] gap-2 rounded-md border border-border bg-surface-muted p-2 text-center text-sm font-semibold"
        role="img"
      >
        <div className="flex items-center justify-center rounded border-2 border-dashed border-brand bg-orange-50 p-3 text-brand">
          {EVACUATION_SIMULATION_LABELS.zoneGravats}
        </div>
        <div className="flex items-center justify-center rounded bg-accent/30 p-3 text-ink">
          {EVACUATION_SIMULATION_LABELS.zoneTrajet}
        </div>
        <div className="flex items-center justify-center rounded border-2 border-dashed border-real bg-blue-50 p-3 text-real">
          {EVACUATION_SIMULATION_LABELS.zoneDepot}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(scenario).map(([field, value]) => {
          const typedField = field as keyof EvacuationScenario;
          return (
            <label className="grid gap-1 text-sm font-semibold" key={field}>
              {EVACUATION_SIMULATION_LABELS.fieldLabels[typedField]}
              <input
                className="rounded-md border border-border bg-surface px-3 py-2 font-normal text-ink"
                min="0.1"
                onChange={(event) => updateScenario(typedField, event.target.value)}
                step={INTEGER_FIELDS.includes(typedField) ? "1" : "0.1"}
                type="number"
                value={value}
              />
            </label>
          );
        })}
      </div>

      <button
        className="rounded-md bg-brand px-4 py-2 font-semibold text-brand-contrast disabled:cursor-not-allowed disabled:opacity-60"
        onClick={runSimulation}
        type="button"
      >
        {EVACUATION_SIMULATION_LABELS.runButton}
      </button>

      {error ? (
        <p aria-live="polite" className="font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {measures ? (
        <div aria-live="polite" className="rounded-md border border-border bg-surface-muted p-4">
          <h3 className="font-bold">{EVACUATION_SIMULATION_LABELS.resultsHeading}</h3>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-ink-muted">{EVACUATION_SIMULATION_LABELS.measureLabels.volumeM3}</dt>
              <dd className="font-semibold">{formatFrenchNumber(measures.volumeM3)} m³</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">{EVACUATION_SIMULATION_LABELS.measureLabels.numberOfTrips}</dt>
              <dd className="font-semibold">{formatFrenchNumber(measures.numberOfTrips, 0)}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">{EVACUATION_SIMULATION_LABELS.measureLabels.distanceM}</dt>
              <dd className="font-semibold">{formatFrenchNumber(measures.distanceM, 0)} m</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">{EVACUATION_SIMULATION_LABELS.measureLabels.elapsedMinutes}</dt>
              <dd className="font-semibold">{formatFrenchNumber(measures.elapsedMinutes)} min</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">{EVACUATION_SIMULATION_LABELS.measureLabels.pedagogicalConsumption}</dt>
              <dd className="font-semibold">{formatFrenchNumber(measures.pedagogicalConsumption)}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  );
}