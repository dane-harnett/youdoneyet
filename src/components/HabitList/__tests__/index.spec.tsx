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
        <HabitList />
      </MockedProvider>
    );

  it("indicates loading", async () => {
    const { findByTestId } = renderWithOneHabit();
    await findByTestId("loading");
  });
  it("contains the habit list with one habit", async () => {
    const { findByTestId, getByText } = renderWithOneHabit();
    await findByTestId("habit-list");
    await getByText("Name: habit name");
    await getByText("Goal: 1");
    await getByText("Count: 0");
    await findByTestId("log-button");
  });
  it("logs a habit", async () => {
    const { findByTestId, findByText } = renderWithOneHabit();
    const logButton = await findByTestId("log-button");
    await findByText("Count: 0");
    // this increments the count in local storage simulating by changing this
    count = 1;
    fireEvent.click(logButton);
    await findByText("Count: 1");
  });
});
