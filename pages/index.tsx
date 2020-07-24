import React from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import AppHeader from "../src/components/AppHeader";
import NavigationTabs from "../src/components/NavigationTabs";
import SelectedDate from "../src/components/SelectedDate";
import EmptyHabitList from "../src/components/EmptyHabitList";

interface Habit {
  name: string;
  goal: number;
}

export const HABITS_QUERY = gql`
  query {
    habits @client {
      name
      goal
    }
  }
`;

export const IndexPage = () => {
  const apolloClient = useApolloClient();
  const { data, loading } = useQuery(HABITS_QUERY);

  // refactor into a hook so we can stub in unit tests
  // const [setHabitList] = useHabitList();

  const setHabitList = (habitList: Array<Habit>) => {
    window.localStorage.setItem("habits", JSON.stringify(habitList));
    apolloClient.cache.evict({ fieldName: "habits" });
  };

  return (
    <div data-testid="day-screen">
      <AppHeader />
      <NavigationTabs />
      <SelectedDate />
      {loading ? (
        <div data-testid="loading">Loading habits...</div>
      ) : data.habits.length === 0 ? (
        <EmptyHabitList setHabitList={setHabitList} />
      ) : (
        <div data-testid="habit-list">
          {data.habits.map(({ name, goal }: Habit) => (
            <div>
              <div>Name: {name}</div>
              <div>Goal: {goal}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
