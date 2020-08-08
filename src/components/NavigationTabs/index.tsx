import React from "react";
import Link from "next/link";
import Router from "next/router";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewDayIcon from "@material-ui/icons/ViewDay";

interface Props {
  value: number;
}

export const NavigationTabs = ({ value }: Props) => (
  <Paper data-testid="navigation-tabs" square>
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      aria-label="navigation tabs"
      onChange={(event, index) => {
        if (index === 0) {
          Router.push("/");
        } else {
          Router.push("/summary");
        }
      }}
    >
      <Tab label="Day" icon={<ViewDayIcon />} data-testid="day-tab" />
      <Tab label="Summary" icon={<ViewDayIcon />} data-testid="summary-tab" />
    </Tabs>
  </Paper>
);

export default NavigationTabs;
