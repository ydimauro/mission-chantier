export type SensorTestMeasurement = {
  distanceM: number;
  attempt: number;
  detected: boolean;
};

export function runSensorTest(distanceM: number, attempt: number): SensorTestMeasurement {
  if (!Number.isFinite(distanceM) || distanceM <= 0) throw new RangeError("distanceM");
  if (!Number.isInteger(attempt) || attempt < 1) throw new RangeError("attempt");

  const detected = distanceM <= 2 || (distanceM <= 3 && attempt % 2 === 1);
  return { distanceM, attempt, detected };
}

export function hasRepeatedProtocol(measurements: readonly SensorTestMeasurement[]): boolean {
  const counts = new Map<number, number>();
  for (const measurement of measurements) {
    counts.set(measurement.distanceM, (counts.get(measurement.distanceM) ?? 0) + 1);
  }
  return counts.size >= 3 && [...counts.values()].every((count) => count >= 2);
}