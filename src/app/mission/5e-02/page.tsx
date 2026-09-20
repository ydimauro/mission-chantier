import type { Metadata } from "next";
import { Mission5E02Client } from "@/app/mission/5e-02/Mission5E02Client";

export const metadata: Metadata = { title: "5E-02 · Démolir, conserver, transformer" };

export default function Mission5E02Page() {
  return <Mission5E02Client />;
}
