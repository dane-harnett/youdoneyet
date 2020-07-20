import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import EmptyHabitList from "../index";

describe("Empty habit list", () => {
  it("can be targeted by tests", () => {
    const { getByTestId } = render(<EmptyHabitList />);
    getByTestId("empty-habit-list");
  });
  it("prompts the user to create their first habit", () => {
    const { getByTestId } = render(<EmptyHabitList />);
    expect(getByTestId("prompt")).toHaveTextContent("Create your first habit");
  });
  it("create link can be target by tests", () => {
    const { getByTestId } = render(<EmptyHabitList />);
    getByTestId("create-first-habit-link");
  });
  it("clicking create link shows the create habit form", () => {
    const { getByTestId } = render(<EmptyHabitList />);
    fireEvent.click(getByTestId("create-first-habit-link"));
    getByTestId("create-habit-form");
    getByTestId("name-field");
    getByTestId("goal-field");
    getByTestId("cancel-button");
    getByTestId("create-button");
  });
  it("clicking cancel button hides the create habit form", async () => {
    const { getByTestId, queryByTestId } = render(<EmptyHabitList />);
    fireEvent.click(getByTestId("create-first-habit-link"));
    getByTestId("create-habit-form");
    fireEvent.click(getByTestId("cancel-button"));
    await waitForElementToBeRemoved(() => queryByTestId("create-habit-form"));
  });
});
