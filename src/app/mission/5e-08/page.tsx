import type { Metadata } from "next";
import { Mission5E08Client } from "@/app/mission/5e-08/Mission5E08Client";

export const metadata: Metadata = { title: "5E-08 · Comment évacuer les gravats ?" };

export default function Mission5E08Page() {
  return <Mission5E08Client />;
}
