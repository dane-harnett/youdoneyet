import { gql, useMutation, useQuery, QueryHookOptions } from "@apollo/client";
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
import { SUMMARIES_QUERY } from "../SummaryList";

export const HABITS_QUERY = gql`
  query($selectedDate: String) {
    habits(selectedDate: $selectedDate) {
      id
      name
      goal
      count
    }
  }
`;

export const ADD_HABIT = gql`
  mutation AddHabit($name: String, $goal: Int) {
    addHabit(name: $name, goal: $goal) {
      id
      name
      goal
    }
  }
`;

export const EDIT_HABIT = gql`
  mutation EditHabit($id: Int, $name: String, $goal: Int) {
    editHabit(id: $id, name: $name, goal: $goal) {
      id
      name
      goal
    }
  }
`;

export const DELETE_HABIT = gql`
  mutation DeleteHabit($id: Int) {
    deleteHabit(id: $id)
  }
`;

export const LOG_HABIT = gql`
  mutation LogHabit($habitId: Int, $count: Int, $dateLogged: String) {
    logHabit(habitId: $habitId, count: $count, dateLogged: $dateLogged) {
      habitId
      count
      dateLogged
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
  const queryOptions: QueryHookOptions<any, { selectedDate: string }> = {
    variables: { selectedDate: format(selectedDate, "yyyy-MM-dd") },
    fetchPolicy: "cache-and-network",
  };
  const { data, loading, error } = useQuery(HABITS_QUERY, queryOptions);
  const mutationOptions = {
    refetchQueries: [
      {
        query: HABITS_QUERY,
        ...queryOptions,
      },
      {
        query: SUMMARIES_QUERY,
        fetchPolicy: "cache-and-network",
      },
    ],
  };
  const [addHabit] = useMutation(ADD_HABIT, mutationOptions);
  const [editHabit] = useMutation(EDIT_HABIT, mutationOptions);
  const [deleteHabit] = useMutation(DELETE_HABIT, mutationOptions);
  const [logHabit] = useMutation(LOG_HABIT, mutationOptions);

  const onCreate = (newHabit: SerializedHabit) => {
    addHabit({
      variables: newHabit,
    });
  };
  const onEdit = (editedHabit: SerializedHabit) => {
    editHabit({
      variables: editedHabit,
    });
  };
  const onDelete = (deletedHabit: SerializedHabit) => {
    deleteHabit({
      variables: deletedHabit,
    });
  };
  const onLog = (log: HabitLog) => {
    logHabit({
      variables: log,
    });
  };

  const [open, setOpen] = useState(false);

  return loading || error ? (
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
            {data.habits.map((habit: Habit, habitIndex: number) => (
              <HabitListItem
                key={`${format(selectedDate, "yyyy-MM-dd")}-${habit.id}`}
                habit={habit}
                habitIndex={habitIndex}
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
