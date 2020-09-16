import { ApolloServer, AuthenticationError, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

import generateHabitsModel from "../../src/models/generateHabitsModel";
import { HabitsModel } from "../../src/types/HabitsModel";

const prisma = new PrismaClient();

interface User {
  name: string;
  email: string;
  image: string;
}

interface Context {
  user?: User;
  models: {
    habits: HabitsModel;
  };
}

const typeDefs = gql`
  type HabitDetails {
    id: String
    name: String
    goal: Int
  }

  type Habit {
    id: Int
    name: String
    goal: Int
    count: Int
  }

  type HabitLog {
    habitId: String
    count: Int
    dateLogged: String
  }

  type SummaryRecord {
    date: String
    completed: Boolean
  }

  type Summary {
    id: Int
    name: String
    goal: Int
    streak: Int
    records: [SummaryRecord]
  }

  type Query {
    habits(selectedDate: String): [Habit]
    summaries: [Summary]
  }

  type Mutation {
    addHabit(name: String, goal: Int): HabitDetails
    editHabit(id: Int, name: String, goal: Int): HabitDetails
    deleteHabit(id: Int): Boolean
    logHabit(habitId: Int, count: Int, dateLogged: String): HabitLog
  }
`;

const resolvers = {
  Query: {
    habits: (
      _parent: any,
      args: { selectedDate: string },
      context: Context
    ) => {
      return context.models.habits.getHabits(args.selectedDate);
    },
    summaries: (_parent: any, _args: {}, context: Context) => {
      return context.models.habits.getSummaries();
    },
  },
  Mutation: {
    addHabit: (
      _parent: any,
      args: { name: string; goal: number },
      context: Context
    ) => {
      return context.models.habits.add(args);
    },
    editHabit: (
      _parent: any,
      args: {
        id: number;
        name: string;
        goal: number;
      },
      context: Context
    ) => {
      return context.models.habits.edit({
        id: args.id,
        name: args.name,
        goal: args.goal,
      });
    },
    deleteHabit: (_parent: any, args: { id: number }, context: Context) => {
      return context.models.habits.delete(args.id);
    },
    logHabit: (
      _parent: any,
      args: {
        habitId: number;
        count: number;
        dateLogged: string;
      },
      context: Context
    ) => {
      return context.models.habits.log({
        habitId: args.habitId,
        count: args.count,
        dateLogged: args.dateLogged,
      });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req });

    if (!session?.user) {
      throw new AuthenticationError("You must be logged in");
    }

    const habits = generateHabitsModel({ user: session.user, prisma });

    return {
      user: session?.user,
      models: {
        habits,
      },
    };
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

export default cors(handler);
