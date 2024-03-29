import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("render without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);

  const errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBe(0);
});

test("render decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");

  expect(button.length).toBe(1);
});

test("counter never is negative", () => {
  const counter = 0;
  const displayError = false;
  const wrapper = setup(null, { counter, displayError });
  const button = findByTestAttr(wrapper, "decrement-button");

  button.simulate("click");
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter);

  const errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.text()).toContain("Counter cannot be negative!");
});

test("clicking button decrements counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);

  const errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBe(0);
});
