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

export const EmptyHabitList = ({ setHabitList }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(1);
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
            onClick={() => {
              setOpen(false);
              setHabitList([{ name, goal }]);
            }}
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
