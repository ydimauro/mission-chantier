import type { SensorDistanceOption } from "@/components/mission/SommativeSensorProtocol";

export const MISSION_4E_08 = { id: "4E-08", objectifs: ["Construis un protocole avec des essais répétés.", "Propose un seuil de sécurité à partir de tes observations."], problematique: "À quelle distance le capteur détecte-t-il correctement un obstacle ?", consigne: "Choisis une distance, réalise des essais répétés, puis complète ton protocole." } as const;
export const SENSOR_TEST_4E_08_DISTANCES: readonly SensorDistanceOption[] = [{ valueM: 1, label: "1 m" }, { valueM: 2, label: "2 m" }, { valueM: 2.5, label: "2,5 m" }, { valueM: 3, label: "3 m" }, { valueM: 4, label: "4 m" }];
export const SENSOR_TEST_4E_08_THRESHOLDS: readonly SensorDistanceOption[] = [{ valueM: 1, label: "1 m" }, { valueM: 2, label: "2 m" }, { valueM: 2.5, label: "2,5 m" }, { valueM: 3, label: "3 m" }];
export const MISSION_4E_08_LIMIT_LABEL = "Écris une limite de ce protocole.";
export const MISSION_4E_08_TRACE = { title: "Mon protocole de test", prompt: "Recopie ton tableau de mesures : distance / essai 1 / essai 2 / observation. Ajoute le seuil proposé et une limite du test." } as const;
export const MISSION_4E_08_BILAN = "Ton protocole a été enregistré. Il sera corrigé par le professeur ou la professeure.";