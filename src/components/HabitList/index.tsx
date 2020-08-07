import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  makeStyles,
  CircularProgress,
  Fab,
  Grid,
  Box,
  LinearProgress,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LogIcon from "@material-ui/icons/PlaylistAdd";
import { format } from "date-fns";

import CreateHabitDialog from "../CreateHabitDialog";
import EmptyHabitList from "../EmptyHabitList";

import { Habit } from "../../types/Habit";
import { HabitLog } from "../../types/HabitLog";

export const HABITS_QUERY = gql`
  query {
    habits @client {
      id
      name
      goal
      count
    }
  }
`;

const useFabStyles = makeStyles({
  root: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
});
interface Props {
  selectedDate: Date;
}
export const HabitList = ({ selectedDate }: Props) => {
  const fabClasses = useFabStyles();
  const { data, loading } = useQuery(HABITS_QUERY, {
    variables: { selectedDate },
  });
  const apolloClient = useApolloClient();

  // refactor into a hook so we can stub in unit tests
  // const [setHabitList] = useHabitList();

  const setHabitList = (habitList: Array<Habit>) => {
    window.localStorage.setItem("habits", JSON.stringify(habitList));
    apolloClient.cache.evict({ fieldName: "habits" });
  };

  const onCreate = (habit: { id: string; name: string; goal: number }) => {
    setHabitList(data.habits.concat([habit]));
  };
  const onLog = (log: HabitLog) => {
    const habitLogs = JSON.parse(
      window.localStorage.getItem("habit_logs") || "[]"
    );
    window.localStorage.setItem(
      "habit_logs",
      JSON.stringify(habitLogs.concat(log))
    );
    apolloClient.cache.evict({ fieldName: "habits" });
  };

  const [open, setOpen] = useState(false);

  return loading ? (
    <div data-testid="loading">
      <CircularProgress />
    </div>
  ) : (
    <>
      {data.habits.length === 0 ? (
        <EmptyHabitList openCreateHabitDialog={() => setOpen(true)} />
      ) : (
        <>
          <Box px={1} data-testid="habit-list">
            {data.habits.map(({ id, name, goal, count }: Habit) => (
              <Box
                bgcolor={"#e4e4e4"}
                display="flex"
                key={id}
                alignItems="center"
                p={1}
                borderRadius={4}
                mb={1}
              >
                <Grid item container>
                  <Grid item xs={12} data-testid="habit-name">
                    {name}
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" mr={1}>
                        <LinearProgress
                          color="primary"
                          variant="determinate"
                          value={(count / goal) * 100}
                        />
                      </Box>
                      <Box minWidth={40}>
                        <Typography variant="body2" color="textSecondary">
                          <span data-testid="habit-count">{count}</span>/
                          <span data-testid="habit-goal">{goal}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <IconButton
                  data-testid="log-button"
                  onClick={() =>
                    onLog({
                      habitId: id,
                      count: 1,
                      dateLogged: format(selectedDate, "yyyy-MM-dd"),
                    })
                  }
                >
                  <LogIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Fab
            aria-label="create-new-habit"
            classes={fabClasses}
            color="primary"
            data-testid="create-new-habit"
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Fab>
        </>
      )}
      <CreateHabitDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={onCreate}
      />
    </>
  );
};

export default HabitList;
