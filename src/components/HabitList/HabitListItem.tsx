import React from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LogIcon from "@material-ui/icons/PlaylistAdd";
import { format } from "date-fns";

import { Habit } from "../../types/Habit";
import { HabitLog } from "../../types/HabitLog";

interface Props {
  habit: Habit;
  onLog: (log: HabitLog) => void;
  selectedDate: Date;
}

export const HabitListItem = ({ habit, onLog, selectedDate }: Props) => {
  const theme = useTheme();
  const emptyBgColor = theme.custom.ListItem.backgroundColor;
  const percentComplete = (habit.count / habit.goal) * 100;
  return (
    <Box
      data-testid={habit.id}
      display="flex"
      key={habit.id}
      alignItems="center"
      p={1}
      borderRadius={4}
      mb={1}
      style={{
        background:
          habit.count === 0
            ? emptyBgColor
            : habit.count === habit.goal
            ? theme.custom.ListItem.completedColor
            : `linear-gradient(to right, ${theme.custom.ListItem.inProgressColor} ${percentComplete}%, ${emptyBgColor} ${percentComplete}%)`,
      }}
    >
      <Grid item container>
        <Grid item xs={12} data-testid="habit-name">
          {habit.name}
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Box minWidth={40}>
              <Typography variant="body2" color="textSecondary">
                <span data-testid="habit-count">{habit.count}</span>/
                <span data-testid="habit-goal">{habit.goal}</span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {habit.count < habit.goal ? (
        <IconButton
          data-testid="log-button"
          onClick={() =>
            onLog({
              habitId: habit.id,
              count: 1,
              dateLogged: format(selectedDate, "yyyy-MM-dd"),
            })
          }
        >
          <LogIcon fontSize="small" />
        </IconButton>
      ) : (
        <CheckCircleIcon htmlColor="#e4e4e4" data-testid="completed-icon" />
      )}
    </Box>
  );
};

export default HabitListItem;
