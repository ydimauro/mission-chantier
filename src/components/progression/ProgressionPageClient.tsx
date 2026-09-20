"use client";

import { useProgression } from "@/providers/progression-provider";
import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { ProgressionDashboard } from "@/components/progression/ProgressionDashboard";

function Dashboard() {
  const { snapshot } = useProgression();
  if (snapshot.status !== "ready") return null;
  return <ProgressionDashboard file={snapshot.file} />;
}

export function ProgressionPageClient() {
  return (
    <RequireStudentIdentity>
      <Dashboard />
    </RequireStudentIdentity>
  );
}
