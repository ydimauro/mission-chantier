import type { Metadata } from "next";
import { Mission4E00Client } from "@/app/mission/4e-00/Mission4E00Client";

export const metadata: Metadata = { title: "4E-00 · Retour sur le chantier" };

export default function Mission4E00Page() {
  return <Mission4E00Client />;
}
