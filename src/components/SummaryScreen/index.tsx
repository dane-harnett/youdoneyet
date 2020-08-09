import React from "react";
import AppHeader from "../AppHeader";
import NavigationTabs from "../NavigationTabs";
import SummaryList from "../SummaryList";

import { ThemeType } from "../../types/ThemeType";
interface Props {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

export const SummaryScreen = ({ themeType = "light", setThemeType }: Props) => {
  return (
    <div data-testid="summary-screen">
      <AppHeader themeType={themeType} setThemeType={setThemeType} />
      <NavigationTabs value={1} />
      <SummaryList />
    </div>
  );
};

export default SummaryScreen;
