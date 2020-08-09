import React from "react";
import dynamic from "next/dynamic";
import DayScreen from "../src/components/DayScreen";
import { ThemeType } from "../src/types/ThemeType";

interface Props {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

export const IndexPage = ({ themeType = "light", setThemeType }: Props) => {
  return <DayScreen themeType={themeType} setThemeType={setThemeType} />;
};

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
