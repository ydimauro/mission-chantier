import type { Metadata } from "next";
import { Mission4E01Client } from "@/app/mission/4e-01/Mission4E01Client";

export const metadata: Metadata = { title: "4E-01 · Dans une pelle hydraulique" };

export default function Mission4E01Page() {
  return <Mission4E01Client />;
}