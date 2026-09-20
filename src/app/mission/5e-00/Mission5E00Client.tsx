"use client";

import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { PrologueGivorsSeTransforme } from "@/components/mission/PrologueGivorsSeTransforme";
import { MISSION_5E_00_CONTENT } from "@content/5e/5e-00";

export function Mission5E00Client() {
  return (
    <RequireStudentIdentity>
      <PrologueGivorsSeTransforme content={MISSION_5E_00_CONTENT} />
    </RequireStudentIdentity>
  );
}
