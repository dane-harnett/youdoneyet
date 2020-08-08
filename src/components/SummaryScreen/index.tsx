import React from "react";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";

export const SummaryScreen = () => {
  return (
    <div data-testid="summary-screen">
      <AppHeader />
      <NavigationTabs value={1} />
    </div>
  );
};

export default SummaryScreen;
