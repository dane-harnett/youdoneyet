import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Habit } from "../../types/Habit";

export const DeleteHabitDialog = ({
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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      data-testid="delete-habit-form"
    >
      <DialogTitle id="form-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this habit?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="cancel-button">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            onSave(habit);
          }}
          color="secondary"
          variant="contained"
          data-testid="confirm-delete-button"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteHabitDialog;
