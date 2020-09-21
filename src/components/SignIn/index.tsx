import React from "react";
import { makeStyles, Box, Button, Paper, Typography } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { signIn } from "next-auth/client";

const useStyles = makeStyles({
  layout: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 80,
  },
});

export const SignIn = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Paper>
        <Box p={2}>
          <Typography variant="h4" gutterBottom align="center">
            Sign in
          </Typography>
          <Typography variant="body1" align="center" style={{ fontSize: 64 }}>
            <AccountBoxIcon fontSize="inherit" />
          </Typography>
          <Typography variant="body1" gutterBottom>
            Click below to sign in or create an account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              signIn("auth0");
            }}
          >
            Sign in/Create account
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default SignIn;
