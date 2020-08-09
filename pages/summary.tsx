import React from "react";
import dynamic from "next/dynamic";
import SummaryScreen from "../src/components/SummaryScreen";
import { ThemeType } from "../src/types/ThemeType";

interface Props {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

export const SummaryPage = ({ themeType = "light", setThemeType }: Props) => {
  return <SummaryScreen themeType={themeType} setThemeType={setThemeType} />;
};

export default dynamic(() => Promise.resolve(SummaryPage), {
  ssr: false,
});
