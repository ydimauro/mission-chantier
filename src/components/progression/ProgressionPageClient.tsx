"use client";

import { useProgression } from "@/providers/progression-provider";
import { IdentitySetupForm } from "@/components/progression/IdentitySetupForm";
import { ProgressionDashboard } from "@/components/progression/ProgressionDashboard";
import { ConflictDialog } from "@/components/progression/ConflictDialog";
import { WrongFileNotice } from "@/components/progression/WrongFileNotice";

export function ProgressionPageClient() {
  const { snapshot } = useProgression();

  if (snapshot.status === "loading") {
    return null;
  }

  if (snapshot.status === "wrong-file") {
    return (
      <div className="px-4 py-16">
        <WrongFileNotice
          sessionCode={snapshot.sessionCode}
          fileCode={snapshot.incoming.studentCode}
        />
      </div>
    );
  }

  if (snapshot.status === "conflict") {
    return (
      <div className="px-4 py-16">
        <ConflictDialog kind={snapshot.kind} />
      </div>
    );
  }

  if (snapshot.status === "ready") {
    return <ProgressionDashboard file={snapshot.file} />;
  }

  return (
    <div className="px-4 py-16">
      <IdentitySetupForm />
    </div>
  );
}
