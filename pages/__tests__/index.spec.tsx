import React from "react";
import { render } from "@testing-library/react";
import { IndexPage } from "../index";

describe("Day screen", () => {
  it("can be targeted by cypress", () => {
    const dayScreen = render(<IndexPage />);
    dayScreen.getByTestId("day-screen");
  });
  it("contains the app header", () => {
    const dayScreen = render(<IndexPage />);
    dayScreen.getByTestId("app-header");
  });
});
