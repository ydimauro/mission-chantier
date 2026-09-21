import type { Metadata } from "next";
import { Mission5EFinalClient } from "@/app/mission/5e-final/Mission5EFinalClient";

export const metadata: Metadata = { title: "5E-FINAL · Nouveau chantier" };

export default function Mission5EFinalPage() {
  return <Mission5EFinalClient />;
}
