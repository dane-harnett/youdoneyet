import React from "react";
import { Typography, Link } from "@material-ui/core";

export const EmptyHabitList = () => (
  <div data-testid="empty-habit-list">
    <Typography align="center" variant="body1">
      <Link
        component="button"
        variant="body1"
        onClick={() => {}}
        underline="always"
      >
        Create
      </Link>{" "}
      your first habit
    </Typography>
  </div>
);

export default EmptyHabitList;
