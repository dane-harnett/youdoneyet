import React from "react";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SummaryList from "../SummaryList";

export const SummaryScreen = () => {
  return (
    <div data-testid="summary-screen">
      <AppHeader />
      <NavigationTabs value={1} />
      <SummaryList />
    </div>
  );
};

export default SummaryScreen;
