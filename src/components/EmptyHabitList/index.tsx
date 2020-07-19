import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";

export const EmptyHabitList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div data-testid="empty-habit-list">
      <Typography data-testid="prompt" align="center" variant="body1">
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            setOpen(true);
          }}
          underline="always"
          data-testid="create-first-habit-link"
        >
          Create
        </Link>{" "}
        your first habit
      </Typography>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
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
            data-testid="name-field"
          />
          <TextField
            margin="dense"
            id="goal"
            label="Goal"
            type="number"
            fullWidth
            data-testid="goal-field"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
            data-testid="cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {}}
            color="primary"
            variant="contained"
            data-testid="create-button"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmptyHabitList;
