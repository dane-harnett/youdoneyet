import React from "react";
import { render } from "@testing-library/react";
import { SelectedDate } from "../index";

describe("Habit list", () => {
  it("displays the selected date", async () => {
    const { findByText, findByTestId } = render(
      <SelectedDate selectedDate={new Date("2020-08-02")} />
    );
    await findByText("Sunday, 2 August 2020");
    await findByTestId("previous-date-button");
    await findByTestId("next-date-button");
  });
});
