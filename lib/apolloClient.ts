import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { HabitLog } from "../src/types/HabitLog";
import { SerializedHabit } from "../src/types/SerializedHabit";
import { format, eachDayOfInterval, sub } from "date-fns";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          habits: {
            read(_parent, context) {
              const selectedDate = context?.variables?.selectedDate;
              const habits = JSON.parse(
                window.localStorage.getItem("habits") || "[]"
              );
              const habitLogs = JSON.parse(
                window.localStorage.getItem("habit_logs") || "[]"
              ).filter(
                (log: HabitLog) =>
                  log.dateLogged === format(selectedDate, "yyyy-MM-dd")
              );
              return habits.map((habit: SerializedHabit) => ({
                ...habit,
                count: habitLogs
                  .filter((log: HabitLog) => log.habitId == habit.id)
                  .reduce((sum: number, log: HabitLog) => sum + log.count, 0),
              }));
            },
          },
          summaries: {
            read() {
              const habits = JSON.parse(
                window.localStorage.getItem("habits") || "[]"
              );
              const habitLogs = JSON.parse(
                window.localStorage.getItem("habit_logs") || "[]"
              );
              const dates = eachDayOfInterval({
                start: sub(new Date(), { days: 21 }),
                end: new Date(),
              });
              console.log("dates", dates);
              return habits.map((habit: SerializedHabit) => {
                const thisHabitsLogs = habitLogs.filter(
                  (log: HabitLog) => log.habitId == habit.id
                );
                return {
                  ...habit,
                  records: dates.map((date) => {
                    const completed =
                      habit.goal ===
                      thisHabitsLogs
                        .filter(
                          (log: HabitLog) =>
                            log.dateLogged === format(date, "yyyy-MM-dd")
                        )
                        .reduce(
                          (sum: number, log: HabitLog) => sum + log.count,
                          0
                        );
                    return {
                      date,
                      completed,
                    };
                  }),
                };
              });
            },
          },
        },
      },
    },
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache,
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo() {
  return useMemo(() => initializeApollo(), []);
}
