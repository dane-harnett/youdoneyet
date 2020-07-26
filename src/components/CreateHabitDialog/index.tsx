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

export const CreateHabitDialog = ({
  onClose,
  onCreate,
  open,
}: {
  onClose: () => void;
  onCreate: (habit: Habit) => void;
  open: boolean;
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(1);

  useEffect(() => {
    if (open) {
      setName("");
      setGoal(1);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      data-testid="create-habit-form"
    >
      <DialogTitle id="form-dialog-title">Create</DialogTitle>
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
            onCreate({ name, goal });
          }}
          color="primary"
          variant="contained"
          data-testid="create-button"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateHabitDialog;
