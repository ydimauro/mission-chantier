import type { Metadata } from "next";
import { Mission5E05Client } from "@/app/mission/5e-05/Mission5E05Client";

export const metadata: Metadata = { title: "5E-05 · Matière, énergie, information" };

export default function Mission5E05Page() {
  return <Mission5E05Client />;
}
