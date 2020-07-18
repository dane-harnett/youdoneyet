import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewDayIcon from "@material-ui/icons/ViewDay";

export const NavigationTabs = () => (
  <Paper data-testid="navigation-tabs" square>
    <Tabs
      value={0}
      indicatorColor="primary"
      textColor="primary"
      aria-label="navigation tabs"
    >
      <Tab label="Day" icon={<ViewDayIcon />} data-testid="day-tab" />
    </Tabs>
  </Paper>
);

export default NavigationTabs;
