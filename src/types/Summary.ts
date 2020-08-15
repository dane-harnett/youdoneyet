import { SummaryRecord } from "./SummaryRecord";

export interface Summary {
  id: string;
  name: string;
  goal: number;
  records: SummaryRecord[];
  streak: number;
}
