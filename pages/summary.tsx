import React from "react";
import dynamic from "next/dynamic";
import SummaryScreen from "../src/components/SummaryScreen";

export const SummaryPage = () => {
  return <SummaryScreen />;
};

export default dynamic(() => Promise.resolve(SummaryPage), {
  ssr: false,
});
