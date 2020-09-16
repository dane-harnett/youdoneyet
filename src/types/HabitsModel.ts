import { Habit, HabitLog } from "@prisma/client";

interface DailyHabit extends Habit {
  count: number;
}
interface SummaryRecord {
  date: string;
  completed: boolean;
}
interface Summary {
  id: number;
  name: string;
  goal: number;
  streak: number;
  records: Array<SummaryRecord>;
}

export interface HabitsModel {
  getHabits(selectedDate: string): DailyHabit[];
  add(habit: Omit<Habit, "id" | "userId">): Habit;
  edit(habit: Omit<Habit, "userId">): Habit;
  delete(id: number): boolean;
  log(log: Omit<HabitLog, "id">): HabitLog;
  getSummaries(): [Summary];
}
