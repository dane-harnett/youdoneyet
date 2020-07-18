import React from "react";
import { format } from "date-fns";
import { Typography } from "@material-ui/core";

export const SelectedDate = () => (
  <Typography align="center" variant="h6" data-testid="selected-date">
    {format(new Date(), "EEEE, d LLLL yyyy")}
  </Typography>
);

export default SelectedDate;
