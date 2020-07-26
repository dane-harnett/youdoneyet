import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { format } from "date-fns";
import { IndexPage } from "../index";
import { InMemoryCache } from "@apollo/client";

describe("Day screen", () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          habits: {
            read() {
              return [];
            },
          },
        },
      },
    },
  });
  const renderWithEmptyHabits = () =>
    render(
      <MockedProvider cache={cache} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    );

  it("can be targeted by tests", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    await findByTestId("day-screen");
  });
  it("contains the app header", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    await findByTestId("app-header");
  });
  it("contains the navigation tabs", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    await findByTestId("navigation-tabs");
  });
  it("day tab is selected", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    const dayTab = await findByTestId("day-tab");
    expect(dayTab).toHaveAttribute("aria-selected", "true");
    expect(dayTab).toHaveTextContent("Day");
  });
  it("contains the selected date", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    const selectedDateEl = await findByTestId("selected-date");
    expect(selectedDateEl).toHaveTextContent(
      format(new Date(), "EEEE, d LLLL yyyy")
    );
  });
  it("indicates loading", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    await findByTestId("loading");
  });
  it("contains the empty habit list", async () => {
    const { findByTestId } = renderWithEmptyHabits();
    await findByTestId("empty-habit-list");
  });
  it("clicking create link shows the create habit form", async () => {
    const { findByTestId, getByTestId } = renderWithEmptyHabits();
    const createFirstHabit = await findByTestId("create-first-habit");
    fireEvent.click(createFirstHabit);
    getByTestId("create-habit-form");
    getByTestId("name-field");
    getByTestId("goal-field");
    getByTestId("cancel-button");
    getByTestId("create-button");
  });
  it("clicking cancel button hides the create habit form", async () => {
    const {
      findByTestId,
      getByTestId,
      queryByTestId,
    } = renderWithEmptyHabits();
    const createFirstHabit = await findByTestId("create-first-habit");
    fireEvent.click(createFirstHabit);
    getByTestId("create-habit-form");
    fireEvent.click(getByTestId("cancel-button"));
    await waitForElementToBeRemoved(() => queryByTestId("create-habit-form"));
  });
});
