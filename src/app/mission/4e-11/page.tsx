import type { Metadata } from "next";
import { Mission4E11Client } from "@/app/mission/4e-11/Mission4E11Client";
export const metadata: Metadata = { title: "4E-11 · Chantier intelligent" };
export default function Mission4E11Page() { return <Mission4E11Client />; }