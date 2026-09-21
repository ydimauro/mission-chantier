import type { Metadata } from "next";
import { Mission4E07Client } from "@/app/mission/4e-07/Mission4E07Client";
export const metadata: Metadata = { title: "4E-07 · Organiser les flux" };
export default function Mission4E07Page() { return <Mission4E07Client />; }