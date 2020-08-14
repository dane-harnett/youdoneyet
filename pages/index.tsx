import React from "react";
import dynamic from "next/dynamic";
import DayScreen from "../src/components/DayScreen";

export const IndexPage = () => {
  return <DayScreen />;
};

export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false,
});
