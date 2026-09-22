"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseHomeObservations } from "@/lib/mission/home-observations";
import { useProgression } from "@/providers/progression-provider";

/** Les choix restent dans l’URL jusqu’à l’identification de l’élève. */
export function HomeObservationTransfer() {
  const { snapshot, recordResponses } = useProgression();
  const router = useRouter();
  const searchParams = useSearchParams();
  const transferred = useRef<string | null>(null);
  const observations = parseHomeObservations(searchParams.get("observations"));
  const transferKey = observations.join(",");

  useEffect(() => {
    if (snapshot.status !== "ready" || !transferKey || transferred.current === transferKey) return;

    transferred.current = transferKey;
    const missionId = snapshot.file.niveau === "5e" ? "5E-00" : "4E-00";
    recordResponses(missionId, { observationsAccueil: observations });
    router.replace("/mission");
  }, [observations, recordResponses, router, snapshot, transferKey]);

  return null;
}
