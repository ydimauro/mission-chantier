"use client";

import { RequireStudentIdentity } from "@/components/progression/RequireStudentIdentity";
import { PrologueGivorsSeTransforme } from "@/components/mission/PrologueGivorsSeTransforme";
import { MISSION_4E_00_CONTENT } from "@content/4e/4e-00";

export function Mission4E00Client() {
  return (
    <RequireStudentIdentity>
      <PrologueGivorsSeTransforme content={MISSION_4E_00_CONTENT} />
    </RequireStudentIdentity>
  );
}
