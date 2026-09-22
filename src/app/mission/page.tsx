import type { Metadata } from "next";
import { Suspense } from "react";
import { MISSION_HUB_TITLE } from "@content/pages/mission-hub";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { MissionHub } from "@/components/mission/MissionHub";
import { HomeObservationTransfer } from "@/components/mission/HomeObservationTransfer";

export const metadata: Metadata = { title: MISSION_HUB_TITLE };

export default function MissionPage() {
  return (
    <RequireStudentIdentity>
      <Suspense fallback={null}>
        <HomeObservationTransfer />
      </Suspense>
      <MissionHub />
    </RequireStudentIdentity>
  );
}
