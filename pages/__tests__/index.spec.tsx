import React from "react";
import { render } from "@testing-library/react";
import { format } from "date-fns";
import { IndexPage } from "../index";

describe("Day screen", () => {
  it("can be targeted by cypress", () => {
    const { getByTestId } = render(<IndexPage />);
    getByTestId("day-screen");
  });
  it("contains the app header", () => {
    const { getByTestId } = render(<IndexPage />);
    getByTestId("app-header");
  });
  it("contains the navigation tabs", () => {
    const { getByTestId } = render(<IndexPage />);
    getByTestId("navigation-tabs");
  });
  it("day tab is selected", () => {
    const { getByTestId } = render(<IndexPage />);
    const dayTab = getByTestId("day-tab");
    expect(dayTab).toHaveAttribute("aria-selected", "true");
    expect(dayTab).toHaveTextContent("Day");
  });
  it("contains the selected date", () => {
    const { getByTestId } = render(<IndexPage />);
    const selectedDateEl = getByTestId("selected-date");
    expect(selectedDateEl).toHaveTextContent(
      format(new Date(), "EEEE, d LLLL yyyy")
    );
  });
  it("contains the empty habit list", () => {
    const { getByTestId } = render(<IndexPage />);
    getByTestId("empty-habit-list");
  });
});
