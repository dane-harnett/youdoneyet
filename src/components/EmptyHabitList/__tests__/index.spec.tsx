import React from "react";
import { render } from "@testing-library/react";
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
    getByTestId("create-first-habit");
  });
});
