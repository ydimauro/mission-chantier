import type { Metadata } from "next";
import { Mission4E05Client } from "@/app/mission/4e-05/Mission4E05Client";

export const metadata: Metadata = { title: "4E-05 · Diagnostic de panne" };

export default function Mission4E05Page() {
  return <Mission4E05Client />;
}