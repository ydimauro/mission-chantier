import type { Metadata } from "next";
import { Mission4EFinalClient } from "@/app/mission/4e-final/Mission4EFinalClient";

export const metadata: Metadata = { title: "4E-FINAL · Transformer un autre espace" };

export default function Mission4EFinalPage() {
  return <Mission4EFinalClient />;
}