import React, { useState } from "react";
import { add, sub } from "date-fns";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SelectedDate from "../SelectedDate";
import HabitList from "../HabitList";
import { useSession } from "next-auth/client";
import Loading from "../Loading";
import SignIn from "../SignIn";

export const DayScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  return (
    <div data-testid="day-screen">
      <AppHeader />
      {!session ? (
        <SignIn />
      ) : (
        <>
          <NavigationTabs value={0} />
          <SelectedDate
            selectedDate={selectedDate}
            onPrevious={() => setSelectedDate(sub(selectedDate, { days: 1 }))}
            onNext={() => setSelectedDate(add(selectedDate, { days: 1 }))}
          />
          <HabitList selectedDate={selectedDate} />
        </>
      )}
    </div>
  );
};

export default DayScreen;
