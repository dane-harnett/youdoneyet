import React, { useState } from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LogIcon from "@material-ui/icons/PlaylistAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { format } from "date-fns";

import LogDialog from "../LogDialog";
import { Habit } from "../../types/Habit";
import { HabitLog } from "../../types/HabitLog";
import { SerializedHabit } from "../../types/SerializedHabit";
import EditHabitDialog from "../EditHabitDialog";
import DeleteHabitDialog from "../DeleteHabitDialog";

interface Props {
  habit: Habit;
  onDelete: (habit: SerializedHabit) => void;
  onEdit: (habit: SerializedHabit) => void;
  onLog: (log: HabitLog) => void;
  selectedDate: Date;
}

export const HabitListItem = ({
  habit,
  onDelete,
  onEdit,
  onLog,
  selectedDate,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
      <IconButton data-testid="edit-button" onClick={() => setIsEditOpen(true)}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        data-testid="delete-button"
        onClick={() => setIsDeleteOpen(true)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
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
          onClick={() => {
            if (habit.count + 1 < habit.goal) {
              setOpen(true);
            } else {
              onLog({
                habitId: habit.id,
                count: 1,
                dateLogged: format(selectedDate, "yyyy-MM-dd"),
              });
            }
          }}
        >
          <LogIcon fontSize="small" />
        </IconButton>
      ) : (
        <CheckCircleIcon htmlColor="#e4e4e4" data-testid="completed-icon" />
      )}
      <EditHabitDialog
        habit={habit}
        onClose={() => setIsEditOpen(false)}
        onSave={onEdit}
        open={isEditOpen}
      />
      <DeleteHabitDialog
        habit={habit}
        onClose={() => setIsDeleteOpen(false)}
        onSave={onDelete}
        open={isDeleteOpen}
      />
      <LogDialog
        open={open}
        onClose={() => setOpen(false)}
        onLogCount={({ count }) => {
          onLog({
            habitId: habit.id,
            count,
            dateLogged: format(selectedDate, "yyyy-MM-dd"),
          });
        }}
      />
    </Box>
  );
};

export default HabitListItem;
