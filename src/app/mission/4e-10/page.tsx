import type { Metadata } from "next";
import { Mission4E10Client } from "@/app/mission/4e-10/Mission4E10Client";
export const metadata: Metadata = { title: "4E-10 · Concevoir un chantier" };
export default function Mission4E10Page() { return <Mission4E10Client />; }