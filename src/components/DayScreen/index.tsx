import React, { useState } from "react";
import { add, sub } from "date-fns";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SelectedDate from "../SelectedDate";
import HabitList from "../HabitList";

import { ThemeType } from "../../types/ThemeType";
interface Props {
  themeType?: ThemeType;
  setThemeType?: (themeType: ThemeType) => void;
}

export const DayScreen = ({
  themeType = "light",
  setThemeType = () => {},
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div data-testid="day-screen">
      <AppHeader themeType={themeType} setThemeType={setThemeType} />
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
