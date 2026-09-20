import type { Metadata } from "next";
import { Mission5E04Client } from "@/app/mission/5e-04/Mission5E04Client";

export const metadata: Metadata = { title: "5E-04 · Choisir le bon engin" };

export default function Mission5E04Page() {
  return <Mission5E04Client />;
}
