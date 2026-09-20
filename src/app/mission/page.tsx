import type { Metadata } from "next";
import { MISSION_HUB_TITLE } from "@content/pages/mission-hub";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { MissionHub } from "@/components/mission/MissionHub";

export const metadata: Metadata = { title: MISSION_HUB_TITLE };

export default function MissionPage() {
  return (
    <RequireStudentIdentity>
      <MissionHub />
    </RequireStudentIdentity>
  );
}
