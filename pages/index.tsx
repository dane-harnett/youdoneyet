import React, { useState } from "react";
import dynamic from "next/dynamic";
import { add, sub } from "date-fns";
import AppHeader from "../src/components/AppHeader";
import NavigationTabs from "../src/components/NavigationTabs";
import SelectedDate from "../src/components/SelectedDate";
import HabitList from "../src/components/HabitList";

export const IndexPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div data-testid="day-screen">
      <AppHeader />
      <NavigationTabs />
      <SelectedDate
        selectedDate={selectedDate}
        onPrevious={() => setSelectedDate(sub(selectedDate, { days: 1 }))}
        onNext={() => setSelectedDate(add(selectedDate, { days: 1 }))}
      />
      <HabitList selectedDate={selectedDate} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
