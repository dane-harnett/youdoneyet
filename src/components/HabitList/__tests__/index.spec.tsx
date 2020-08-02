import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { HabitList } from "../index";
import { InMemoryCache } from "@apollo/client";

describe("Habit list", () => {
  let count = 0;
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          habits: {
            read() {
              return [{ id: "a-id", name: "habit name", goal: 1, count }];
            },
          },
        },
      },
    },
  });
  const renderWithOneHabit = () =>
    render(
      <MockedProvider cache={cache} addTypename={false}>
        <HabitList selectedDate={new Date()} />
      </MockedProvider>
    );

  it("indicates loading", async () => {
    const { findByTestId } = renderWithOneHabit();
    await findByTestId("loading");
  });
  it("contains the habit list with one habit", async () => {
    const { findByTestId } = renderWithOneHabit();
    await findByTestId("habit-list");
    const habitName = await findByTestId("habit-name");
    expect(habitName).toHaveTextContent("habit name");
    const habitGoal = await findByTestId("habit-goal");
    expect(habitGoal).toHaveTextContent("1");
    const habitCount = await findByTestId("habit-count");
    expect(habitCount).toHaveTextContent("0");
    await findByTestId("log-button");
  });
  it("logs a habit", async () => {
    const { findByTestId } = renderWithOneHabit();
    const logButton = await findByTestId("log-button");
    const habitCount = await findByTestId("habit-count");
    expect(habitCount).toHaveTextContent("0");
    // this increments the count in local storage simulating by changing this
    count = 1;
    fireEvent.click(logButton);
    await findByTestId("habit-count");
    expect(habitCount).toHaveTextContent("1");
  });
});
