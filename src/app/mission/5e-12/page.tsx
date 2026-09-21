import type { Metadata } from "next";
import { Mission5E12Client } from "@/app/mission/5e-12/Mission5E12Client";

export const metadata: Metadata = { title: "5E-12 · Mission Quartier des Ateliers" };

export default function Mission5E12Page() {
  return <Mission5E12Client />;
}
