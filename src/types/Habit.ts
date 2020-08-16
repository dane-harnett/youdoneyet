import { SerializedHabit } from "./SerializedHabit";

export interface Habit extends SerializedHabit {
  count: number;
}
