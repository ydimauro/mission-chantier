import type { Metadata } from "next";
import { Mission5E06Client } from "@/app/mission/5e-06/Mission5E06Client";

export const metadata: Metadata = { title: "5E-06 · La chaîne d’énergie" };

export default function Mission5E06Page() {
  return <Mission5E06Client />;
}
