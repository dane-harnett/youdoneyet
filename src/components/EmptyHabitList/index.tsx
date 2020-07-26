import React from "react";
import { Typography, Link } from "@material-ui/core";

export const EmptyHabitList = ({
  openCreateHabitDialog = () => {},
}: {
  openCreateHabitDialog?: () => void;
}) => {
  return (
    <div data-testid="empty-habit-list">
      <Typography data-testid="prompt" align="center" variant="body1">
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            openCreateHabitDialog();
          }}
          underline="always"
          data-testid="create-first-habit"
        >
          Create
        </Link>{" "}
        your first habit
      </Typography>
    </div>
  );
};

export default EmptyHabitList;
