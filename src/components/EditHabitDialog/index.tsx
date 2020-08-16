import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Habit } from "../../types/Habit";

export const EditHabitDialog = ({
  onClose,
  onSave,
  open,
  habit,
}: {
  onClose: () => void;
  onSave: (habit: { id: string; name: string; goal: number }) => void;
  open: boolean;
  habit: Habit;
}) => {
  const [name, setName] = useState(habit.name);
  const [goal, setGoal] = useState(habit.goal);

  useEffect(() => {
    if (open) {
      setName(habit.name);
      setGoal(habit.goal);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      data-testid="edit-habit-form"
    >
      <DialogTitle id="form-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="name-field"
        />
        <TextField
          margin="dense"
          id="goal"
          label="Goal"
          type="number"
          fullWidth
          value={goal}
          onChange={(e) => setGoal(parseInt(e.target.value, 10))}
          data-testid="goal-field"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="cancel-button">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            onSave({ ...habit, name, goal });
          }}
          color="primary"
          variant="contained"
          data-testid="save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHabitDialog;
