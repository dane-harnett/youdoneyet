import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { makeStyles, CircularProgress, Fab, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { format } from "date-fns";

import CreateHabitDialog from "../CreateHabitDialog";
import EmptyHabitList from "../EmptyHabitList";
import HabitListItem from "./HabitListItem";

import { Habit } from "../../types/Habit";
import { HabitLog } from "../../types/HabitLog";
import { SerializedHabit } from "../../types/SerializedHabit";

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
    apolloClient.cache.evict({ fieldName: "summaries" });
  };

  const onCreate = (habit: SerializedHabit) => {
    setHabitList(data.habits.concat([habit]));
  };
  const onEdit = (editedHabit: SerializedHabit) => {
    const updatedHabits = data.habits.map((habit: Habit) => {
      return editedHabit.id === habit.id ? editedHabit : habit;
    });
    setHabitList(updatedHabits);
  };
  const onDelete = (deletedHabit: SerializedHabit) => {
    const remainingHabits = data.habits.filter((habit: Habit) => {
      return habit.id !== deletedHabit.id;
    });
    const habitLogs = JSON.parse(
      window.localStorage.getItem("habit_logs") || "[]"
    );
    const remainingHabitLogs = habitLogs.filter((log: HabitLog) => {
      return log.habitId !== deletedHabit.id;
    });
    window.localStorage.setItem(
      "habit_logs",
      JSON.stringify(remainingHabitLogs)
    );
    setHabitList(remainingHabits);
    apolloClient.cache.evict({ fieldName: "summaries" });
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
    apolloClient.cache.evict({ fieldName: "summaries" });
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
            {data.habits.map((habit: Habit) => (
              <HabitListItem
                key={`${format(selectedDate, "yyyy-MM-dd")}-${habit.id}`}
                habit={habit}
                onLog={onLog}
                onEdit={onEdit}
                onDelete={onDelete}
                selectedDate={selectedDate}
              />
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
