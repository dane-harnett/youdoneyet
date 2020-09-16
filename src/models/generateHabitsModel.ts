import { HabitLog, PrismaClient } from "@prisma/client";
import { format, eachDayOfInterval, sub } from "date-fns";
import { ForbiddenError } from "apollo-server-micro";

interface NewHabitLog {
  habitId: number;
  dateLogged: string;
  count: number;
}

interface NewHabit {
  name: string;
  goal: number;
}
interface EditedHabit {
  id: number;
  name: string;
  goal: number;
}

interface User {
  name: string;
  email: string;
  image: string;
}

const generateHabitsModel = ({
  user,
  prisma,
}: {
  user: User;
  prisma: PrismaClient;
}) => ({
  getHabits: async (selectedDate: string) => {
    const currentUsersHabits = await prisma.habit.findMany({
      where: {
        userId: user.email,
      },
    });
    const habitLogsForSelectedDate = await prisma.habitLog.findMany({
      where: {
        dateLogged: selectedDate,
      },
    });
    return currentUsersHabits.map((habit) => {
      return {
        ...habit,
        count: habitLogsForSelectedDate
          .filter((log) => log.habitId === habit.id)
          .reduce((sum: number, log) => sum + log.count, 0),
      };
    });
  },
  add: async (habit: NewHabit) => {
    const newHabit = await prisma.habit.create({
      data: {
        ...habit,
        userId: user.email,
      },
    });
    return newHabit;
  },
  edit: async (editedHabit: EditedHabit) => {
    const habitToEdit = await prisma.habit.findOne({
      where: {
        id: editedHabit.id,
      },
    });

    if (habitToEdit?.userId !== user.email) {
      throw new ForbiddenError("Not authorized");
    }

    return await prisma.habit.update({
      where: {
        id: habitToEdit.id,
      },
      data: {
        name: editedHabit.name,
        goal: editedHabit.goal,
      },
    });
  },
  delete: async (id: number) => {
    const habitToDelete = await prisma.habit.findOne({
      where: {
        id,
      },
    });

    if (habitToDelete?.userId !== user.email) {
      throw new ForbiddenError("Not authorized");
    }

    await prisma.habitLog.deleteMany({
      where: {
        habitId: id,
      },
    });

    await prisma.habit.delete({
      where: {
        id,
      },
    });

    return true;
  },
  log: async (log: NewHabitLog) => {
    const habitToLog = await prisma.habit.findOne({
      where: {
        id: log.habitId,
      },
    });

    if (habitToLog?.userId !== user.email) {
      throw new ForbiddenError("Not authorized");
    }
    await prisma.habitLog.create({
      data: {
        dateLogged: log.dateLogged,
        count: log.count,
        habit: {
          connect: {
            id: log.habitId,
          },
        },
      },
    });
    return log;
  },
  getSummaries: async () => {
    const currentUsersHabits = await prisma.habit.findMany({
      where: {
        userId: user.email,
      },
    });
    const habitIds = currentUsersHabits.map((habit) => habit.id);
    const habitLogs = await prisma.habitLog.findMany({
      where: {
        habitId: {
          in: habitIds,
        },
      },
    });
    const dates = eachDayOfInterval({
      start: sub(new Date(), { days: 20 }),
      end: new Date(),
    });
    return currentUsersHabits.map((habit) => {
      const thisHabitsLogs = habitLogs.filter(
        (log: HabitLog) => log.habitId == habit.id
      );
      const records = dates.map((date) => {
        const completed =
          habit.goal ===
          thisHabitsLogs
            .filter(
              (log: HabitLog) => log.dateLogged === format(date, "yyyy-MM-dd")
            )
            .reduce((sum: number, log: HabitLog) => sum + log.count, 0);
        return {
          date,
          completed,
        };
      });
      const reversedRecords = [...records].reverse();
      let streak = reversedRecords[0].completed ? 1 : 0;
      const streakRecords = reversedRecords.slice(1);
      for (let i = 0; i < streakRecords.length; i++) {
        if (streakRecords[i].completed) {
          streak++;
        } else {
          break;
        }
      }
      return {
        ...habit,
        streak,
        records,
      };
    });
  },
});
export default generateHabitsModel;
