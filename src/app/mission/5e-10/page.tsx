import type { Metadata } from "next";
import { Mission5E10Client } from "@/app/mission/5e-10/Mission5E10Client";

export const metadata: Metadata = { title: "5E-10 · Programmer une sécurité simple" };

export default function Mission5E10Page() {
  return <Mission5E10Client />;
}
