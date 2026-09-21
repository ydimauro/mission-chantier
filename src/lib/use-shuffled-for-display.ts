"use client";

import { useEffect, useRef, useState } from "react";
import { shuffleForDisplay } from "@/lib/shuffle";

export function useShuffledForDisplay<T>(values: readonly T[]): readonly T[] {
  const valuesRef = useRef(values);
  const [shuffledValues, setShuffledValues] = useState<readonly T[]>(values);

  useEffect(() => {
    setShuffledValues(shuffleForDisplay(valuesRef.current));
  }, []);

  return shuffledValues;
}