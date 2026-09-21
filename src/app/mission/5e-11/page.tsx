import type { Metadata } from "next";
import { Mission5E11Client } from "@/app/mission/5e-11/Mission5E11Client";

export const metadata: Metadata = { title: "5E-11 · Comparer plusieurs solutions techniques" };

export default function Mission5E11Page() {
  return <Mission5E11Client />;
}
