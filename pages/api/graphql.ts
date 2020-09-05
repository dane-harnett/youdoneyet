import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
  gql,
} from "apollo-server-micro";
import Cors from "micro-cors";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "next-auth/client";

interface Habit {
  id: string;
  name: string;
  goal: number;
  userId: string;
}
type HabitList = Habit[];

let habits: HabitList = [];

interface HabitLog {
  habitId: string;
  dateLogged: string;
  count: number;
}
type HabitLogList = HabitLog[];

let habitLogs: HabitLogList = [];

interface NewHabit {
  name: string;
  goal: number;
}
interface EditedHabit {
  id: string;
  name: string;
  goal: number;
}

const generateHabitsModel = ({ user }: { user: User }) => ({
  getHabits: (selectedDate: string) => {
    const currentUsersHabits = habits.filter(
      (habit) => habit.userId === user.id
    );
    const habitLogsForSelectedDate = habitLogs.filter(
      (log) => log.dateLogged === selectedDate
    );
    return currentUsersHabits.map((habit) => {
      return {
        ...habit,
        count: habitLogsForSelectedDate
          .filter((log) => log.habitId === habit.id)
          .reduce((sum: number, log) => sum + log.count, 0),
      };
    });
  },
  add: (habit: NewHabit) => {
    const newHabit = {
      ...habit,
      id: uuidv4(),
      userId: user.id,
    };
    habits.push(newHabit);
    return newHabit;
  },
  edit: (editedHabit: EditedHabit) => {
    const habitToEdit = habits.find(
      (habit) => habit.id === editedHabit.id && habit.userId === user.id
    );

    if (!habitToEdit) {
      throw new ForbiddenError("Not authorized");
    }

    habits = habits.map((habit) => {
      if (habit.id !== editedHabit.id) {
        return habit;
      }
      return {
        ...editedHabit,
        userId: user.id,
      };
    });
    return {
      ...editedHabit,
      userId: user.id,
    };
  },
  delete: (id: string) => {
    const habitToDelete = habits.find(
      (habit) => habit.id === id && habit.userId === user.id
    );

    if (!habitToDelete) {
      throw new ForbiddenError("Not authorized");
    }

    habits = habits.filter((habit) => habit.id !== id);
    return true;
  },
  log: (log: HabitLog) => {
    const habitToLog = habits.find(
      (habit) => habit.id === log.habitId && habit.userId === user.id
    );

    if (!habitToLog) {
      throw new ForbiddenError("Not authorized");
    }

    habitLogs.push(log);
    return log;
  },
});

interface DailyHabit extends Habit {
  count: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface HabitsModel {
  getHabits(selectedDate: string): DailyHabit[];
  add(habit: NewHabit): Habit;
  edit(habit: EditedHabit): Habit;
  delete(id: string): boolean;
  log(log: HabitLog): HabitLog;
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
    id: String
    name: String
    goal: Int
    count: Int
  }

  type HabitLog {
    habitId: String
    count: Int
    dateLogged: String
  }

  type Query {
    habits(selectedDate: String): [Habit]
  }

  type Mutation {
    addHabit(name: String, goal: Int): HabitDetails
    editHabit(id: String, name: String, goal: Int): HabitDetails
    deleteHabit(id: String): Boolean
    logHabit(habitId: String, count: Int, dateLogged: String): HabitLog
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
        id: string;
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
    deleteHabit: (_parent: any, args: { id: string }, context: Context) => {
      return context.models.habits.delete(args.id);
    },
    logHabit: (
      _parent: any,
      args: {
        habitId: string;
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

    const habits = generateHabitsModel({ user: session.user });

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
