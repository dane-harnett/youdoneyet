import React, { useState } from "react";
import dynamic from "next/dynamic";
import AppHeader from "../src/components/AppHeader";
import NavigationTabs from "../src/components/NavigationTabs";
import SelectedDate from "../src/components/SelectedDate";
import EmptyHabitList from "../src/components/EmptyHabitList";

export const IndexPage = () => {
  const [habitList, setHabitList] = useState([]);
  return (
    <div data-testid="day-screen">
      <AppHeader />
      <NavigationTabs />
      <SelectedDate />
      {habitList.length === 0 ? (
        <EmptyHabitList setHabitList={setHabitList} />
      ) : (
        <div data-testid="habit-list">
          {habitList.map(({ name, goal }) => (
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
