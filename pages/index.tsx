import React from "react";
import dynamic from "next/dynamic";
import AppHeader from "../src/components/AppHeader";
import NavigationTabs from "../src/components/NavigationTabs";
import SelectedDate from "../src/components/SelectedDate";
import HabitList from "../src/components/HabitList";

export const IndexPage = () => {
  return (
    <div data-testid="day-screen">
      <AppHeader />
      <NavigationTabs />
      <SelectedDate />
      <HabitList />
    </div>
  );
};

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
