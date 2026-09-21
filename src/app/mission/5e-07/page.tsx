import type { Metadata } from "next";
import { Mission5E07Client } from "@/app/mission/5e-07/Mission5E07Client";

export const metadata: Metadata = { title: "5E-07 · Le chantier doit fonctionner avec la ville" };

export default function Mission5E07Page() {
  return <Mission5E07Client />;
}
