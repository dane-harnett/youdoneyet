import React from "react";
import { format } from "date-fns";
import { Typography, IconButton, makeStyles } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

interface Props {
  selectedDate: Date;
  onPrevious?: () => void;
  onNext?: () => void;
}

const useStyles = makeStyles({
  layout: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

export const SelectedDate = ({
  selectedDate,
  onPrevious = () => {},
  onNext = () => {},
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.layout} data-testid="selected-date">
      <IconButton
        title="previous date"
        data-testid="previous-date-button"
        onClick={() => onPrevious()}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <Typography align="center" variant="h6" data-testid="date">
        {format(selectedDate, "EEEE, d LLLL yyyy")}
      </Typography>
      <IconButton
        title="next date"
        data-testid="next-date-button"
        onClick={() => onNext()}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default SelectedDate;
