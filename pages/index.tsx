import React from "react";
import dynamic from "next/dynamic";
import AppHeader from "../src/components/AppHeader";
import NavigationTabs from "../src/components/NavigationTabs";
import SelectedDate from "../src/components/SelectedDate";
import EmptyHabitList from "../src/components/EmptyHabitList";

export const IndexPage = () => (
  <div data-testid="day-screen">
    <AppHeader />
    <NavigationTabs />
    <SelectedDate />
    <EmptyHabitList />
  </div>
);

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
