import type { Metadata } from "next";
import { Mission4E03Client } from "@/app/mission/4e-03/Mission4E03Client";

export const metadata: Metadata = { title: "4E-03 · Hydraulique et mouvement" };

export default function Mission4E03Page() {
  return <Mission4E03Client />;
}