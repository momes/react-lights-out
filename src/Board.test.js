import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("should render Board component", function () {
  const { container } = render(<Board />);
});