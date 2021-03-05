import Airtable from "airtable";
import { NowRequest, NowResponse } from "@now/node";

interface JobRecord {
  "Stav": "Aktivní" | "Obsazeno";
  "Projekt": string[] | null;
  "Poptávané kompetence": string[] | null;
  "Úkol/Role": string;
  "Odkaz na celou příležitost": string | null;
  "Detaily": string | null;
  "Časová náročnost": string | null;
  "Urgentní poptávka": boolean;
}

interface Position {
  title: string;
  projectName: string[];
  isOpen: boolean;
  isUrgent: boolean;
  detailUrl: string | null;
  description: string | null;
  timeRequirements: string | null;
  expertise: string[];
}

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY as string;
    const table = new Airtable({ apiKey }).base("appDh1gAClWbLC3xn")(
      "Otevřené role"
    );
    const records = await table.select({ view: "Grid view" }).all();
    const out = JSON.stringify(records.map(parseRecord), null, 2);
    // We don’t use res.json() here intentionally to get pretty printing
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(out);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

function parseRecord(record: Airtable.Record<JobRecord>): Position {
  const fields = record.fields;
  return {
    title: fields["Úkol/Role"],
    projectName: fields["Projekt"] || [],
    isOpen: fields["Stav"] === "Aktivní",
    isUrgent: fields["Urgentní poptávka"],
    detailUrl: fields["Odkaz na celou příležitost"],
    description: fields["Detaily"],
    timeRequirements: fields["Časová náročnost"],
    expertise: fields["Poptávané kompetence"] || [],
  };
}
