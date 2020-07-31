import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { HabitList } from "../index";
import { InMemoryCache } from "@apollo/client";

describe("Habit list", () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          habits: {
            read() {
              return [{ id: "a-id", name: "habit name", goal: 1 }];
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
  it("contains the empty habit list", async () => {
    const { findByTestId, getByText } = renderWithOneHabit();
    await findByTestId("habit-list");
    await getByText("Name: habit name");
    await getByText("Goal: 1");
  });
});
