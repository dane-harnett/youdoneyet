import React, { useState } from "react";
import { add, sub } from "date-fns";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SelectedDate from "../SelectedDate";
import HabitList from "../HabitList";

export const DayScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div data-testid="day-screen">
      <AppHeader />
      <NavigationTabs value={0} />
      <SelectedDate
        selectedDate={selectedDate}
        onPrevious={() => setSelectedDate(sub(selectedDate, { days: 1 }))}
        onNext={() => setSelectedDate(add(selectedDate, { days: 1 }))}
      />
      <HabitList selectedDate={selectedDate} />
    </div>
  );
};

export default DayScreen;
