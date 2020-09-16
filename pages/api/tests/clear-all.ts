import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const habits = await prisma.habit.findMany({
    where: {
      userId: "e2e-testing@youdoneyet.com",
    },
  });

  const habitIds = habits.map(({ id }) => id);

  await prisma.habitLog.deleteMany({
    where: {
      habitId: {
        in: habitIds,
      },
    },
  });

  await prisma.habit.deleteMany({
    where: {
      id: {
        in: habitIds,
      },
    },
  });

  res.status(200).json({ done: true });
};
