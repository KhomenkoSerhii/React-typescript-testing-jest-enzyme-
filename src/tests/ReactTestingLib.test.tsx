/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import TodoComponent from "../components/TodoMainComponent/TodoMainComponent";

describe("App", () => {
  afterEach(cleanup);

  it("Testing local storage in App component", () => {
    render(<App />);
    localStorage.setItem("todoList", "todoList");
    expect(localStorage.getItem("todoList")).toBe("todoList");
  });

  it("EnterKey click", () => {
    const keyPressHandler = jest.fn();

    const { getByTestId } = render(
      <input
        type="text"
        data-testid="simple-input"
        onKeyPress={keyPressHandler}
      />
    );
    const input = getByTestId("simple-input");
    userEvent.type(input, "abc {enter}");
    // fireEvent.change(input, {target: {value: 'abc'}})
    expect(keyPressHandler).toHaveBeenCalled();
  });

  it("func click", () => {
    const keyPressHandler = jest.fn();
    const { getByTestId } = render(
      <input
        type="text"
        data-testid="simple-input"
        onKeyPress={keyPressHandler}
      />
    );

    const input = getByTestId("simple-input");
    userEvent.type(input, "React{enter}");
    // expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    expect(input.value).toBe("React");
    expect(keyPressHandler).toHaveBeenCalled();
  });

  it("Should change input value", () => {
    render(<TodoComponent />);
    expect(screen.queryByText(/React/)).toBeNull();
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });
});
