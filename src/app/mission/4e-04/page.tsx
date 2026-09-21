import type { Metadata } from "next";
import { Mission4E04Client } from "@/app/mission/4e-04/Mission4E04Client";

export const metadata: Metadata = { title: "4E-04 · Chaîne d’information" };

export default function Mission4E04Page() {
  return <Mission4E04Client />;
}