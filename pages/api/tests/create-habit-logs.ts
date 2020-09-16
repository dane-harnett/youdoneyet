import { NextApiRequest, NextApiResponse } from "next";
import { Habit, HabitLog, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { habitName, habitLogs } = req.body;

  // if we try to create habit logs too quickly after just creating a habit
  // sometimes the habit doesn't exist yet.
  await delay(1000);

  const habits = await prisma.habit.findMany({
    where: {
      name: habitName,
      userId: "e2e-testing@youdoneyet.com",
    },
  });

  habits.forEach(async (habit: Habit) => {
    await prisma.habitLog.deleteMany({
      where: {
        habitId: habit.id,
      },
    });
    habitLogs.forEach(async (habitLog: HabitLog) => {
      await prisma.habitLog.create({
        data: {
          ...habitLog,
          habit: {
            connect: {
              id: habit.id,
            },
          },
        },
      });
    });
  });

  res.status(200).json({ done: true });
};
