import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 80,
  },
});

export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
