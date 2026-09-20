import type { Metadata } from "next";
import { Mission5E00Client } from "@/app/mission/5e-00/Mission5E00Client";

export const metadata: Metadata = { title: "5E-00 · Que se passe-t-il à Givors ?" };

export default function Mission5E00Page() {
  return <Mission5E00Client />;
}
