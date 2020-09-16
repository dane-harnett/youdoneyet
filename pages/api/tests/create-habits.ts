import { NextApiRequest, NextApiResponse } from "next";
import { Habit, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  req.body.habits.forEach(async (habit: Habit) => {
    await prisma.habit.create({
      data: {
        ...habit,
        userId: "e2e-testing@youdoneyet.com",
      },
    });
  });

  res.status(200).json({ done: true });
};
