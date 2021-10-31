import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import TodoComponent from "./components/TodoMainComponent/TodoMainComponent";

// Basic tests

// test("renders the component", () => {
//   const component = shallow(<App />);
//   expect(component).toMatchSnapshot();
// });

test("TodoComponent-mainComponent length", () => {
  const component = shallow(<TodoComponent />);
  const wrapper = component.find(".mainComponent");
  expect(wrapper.length).toBe(1);
});
