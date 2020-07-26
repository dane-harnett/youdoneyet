import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { makeStyles, CircularProgress, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import CreateHabitDialog from "../CreateHabitDialog";
import EmptyHabitList from "../EmptyHabitList";

import { Habit } from "../../types/Habit";

export const HABITS_QUERY = gql`
  query {
    habits @client {
      name
      goal
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

export const HabitList = () => {
  const fabClasses = useFabStyles();
  const { data, loading } = useQuery(HABITS_QUERY);
  const apolloClient = useApolloClient();

  // refactor into a hook so we can stub in unit tests
  // const [setHabitList] = useHabitList();

  const setHabitList = (habitList: Array<Habit>) => {
    window.localStorage.setItem("habits", JSON.stringify(habitList));
    apolloClient.cache.evict({ fieldName: "habits" });
  };

  const onCreate = (habit: Habit) => {
    setHabitList(data.habits.concat([habit]));
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
          <div data-testid="habit-list">
            {data.habits.map(({ name, goal }: Habit) => (
              <div>
                <div>Name: {name}</div>
                <div>Goal: {goal}</div>
              </div>
            ))}
          </div>
          <Fab
            classes={fabClasses}
            data-testid="create-new-habit"
            color="primary"
            aria-label="create-new-habit"
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
