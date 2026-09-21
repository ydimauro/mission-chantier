import type { Metadata } from "next";
import { Mission4E02Client } from "@/app/mission/4e-02/Mission4E02Client";

export const metadata: Metadata = { title: "4E-02 · Chaîne d’énergie" };

export default function Mission4E02Page() {
  return <Mission4E02Client />;
}