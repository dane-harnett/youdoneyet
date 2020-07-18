import React from "react";
import { render } from "@testing-library/react";
import AppHeader from "../index";

describe("App header", () => {
  it("contains the app name", () => {
    const { getByTestId } = render(<AppHeader />);
    expect(getByTestId("app-header")).toHaveTextContent("You Done Yet");
  });
});
