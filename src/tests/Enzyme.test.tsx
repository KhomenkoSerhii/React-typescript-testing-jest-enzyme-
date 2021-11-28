import React from "react";
import Enzyme from "enzyme";
import App from "../App";
import { shallow, render } from "enzyme";
import TodoComponent from "../components/TodoMainComponent/TodoMainComponent";
import TodoListComponent from "../components/TodoList/TodoListComponent";

const LocalStorage = require("../config/localStorageMock");

global.localStorage = new LocalStorage();

test("should render App componentt", () => {
  const component = render(<App />);
  expect(component).toMatchSnapshot();
});

// should render TodoComponent component second version
const taskInputComponentSetUp = () => shallow(<TodoComponent />);

describe("TodoComponent component", () => {
  let component: any;
  let instance: any;

  beforeEach(() => {
    component = taskInputComponentSetUp();
    instance = component.instance();
  });

  it("should render TodoComponent component", () => {
    expect(component).toMatchSnapshot();
  });
});

const todoComponentSetUp = (props: any) =>
  shallow(<TodoComponent {...props} />);

describe("todoComponent testing", () => {
  const addHandler = jest.fn();
  let instance: any;
  let add: any;

  beforeEach(() => {
    add = todoComponentSetUp({
      onAdd: addHandler,
    });
    instance = add.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("KeyPress Enter testing", () => {
    expect(addHandler.mock.calls.length).toEqual(0);
    add.find(".TextField").simulate("keypress", { key: "Enter" });
    expect(addHandler.mock.calls.length).toEqual(1);
  });

  test("should contain .mainComponent wrapper", () => {
    const wrapper = add.find(".mainComponent");
    expect(wrapper.length).toBe(1);
  });
});

describe("localStorage", () => {
  beforeEach(() => localStorage.clear());

  it("is initialized properly", () => expect(localStorage.store).toEqual({}));

  it("returns undefined if requested item doesn't exist", () => {
    const foo = localStorage.getItem("foo");
    expect(foo).toEqual(null);
  });

  it("sets the value of an item", () => {
    localStorage.setItem("foo", "bar");
    expect(localStorage.store).toEqual({ foo: "bar" });
  });

  it("gets the value of an item", () => {
    localStorage.setItem("foo", "bar");
    const foo = localStorage.getItem("foo");
    expect(foo).toBe("bar");
  });

  it("removes an item", () => {
    localStorage.setItem("foo", "bar");
    localStorage.removeItem("foo");
    const foo = localStorage.getItem("foo");
    expect(foo).toEqual(null);
  });

  it("clears all items", () => {
    localStorage.setItem("foo", "qwerty");
    localStorage.setItem("bar", "asdf");
    expect(localStorage.store).toEqual({ foo: "qwerty", bar: "asdf" });
    localStorage.clear();
    expect(localStorage.store).toEqual({});
  });
});

// Fake Data
const completedFalse = [
  { completed: false, id: 1635962025460, title: "test1" },
];
const completedTrue = [{ completed: true, id: 16359620254605, title: "test2" }];
//

const todoListComponentSetUp = (props: any) =>
  shallow(<TodoListComponent {...props} />);

describe("TodoListComponent testing", () => {
  const mockCallBack = jest.fn();
  const removeCallBack = jest.fn();
  let checkbox: any;
  let checkboxTrue: any;
  let instance: any;
  beforeEach(() => {
    checkbox = todoListComponentSetUp({
      todoList: completedFalse,
      onToggle: mockCallBack,
      onRemove: removeCallBack,
    });
    checkboxTrue = todoListComponentSetUp({ todoList: completedTrue });
    instance = checkbox.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("CheckboxWithLabel changes the text after click", () => {
    expect(mockCallBack.mock.calls.length).toEqual(0);
    checkbox.find(".Checkbox").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  // test("Remove func testing", () => {
  //   expect(removeCallBack.mock.calls.length).toEqual(0);
  //   checkbox.find(".removeIcon").simulate("click");
  //   expect(removeCallBack.mock.calls.length).toEqual(1);
  // });

  test("Push func & styles testing", () => {
    const wrapper = checkboxTrue.find(".line-through");
    expect(wrapper.length).toBe(1);
  });
});
