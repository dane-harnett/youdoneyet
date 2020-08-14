import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export const LogDialog = ({
  onClose,
  onLogCount,
  open,
}: {
  onClose: () => void;
  onLogCount: ({ count }: { count: number }) => void;
  open: boolean;
}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (open) {
      setCount(1);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      data-testid="log-form"
    >
      <DialogTitle id="form-dialog-title">Log</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="count"
          label="Count"
          type="number"
          fullWidth
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
          data-testid="count-field"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="cancel-button">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            onLogCount({ count });
          }}
          color="primary"
          variant="contained"
          data-testid="log-count-button"
        >
          Log
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogDialog;
