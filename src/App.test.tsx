import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";

import DiscountProcessBar from "./components/DiscountProgressBar";
import { breakpoints } from "./context/ShoppingCartContext";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

describe("Discount Progress Bar", () => {
  test("Should be 60% progress with $30 discount", () => {
    const component = renderer.create(
      <DiscountProcessBar actualDiscount={30} breakpoints={breakpoints} />
    );
    const tree = toJson(component);
    expect(tree.props.placeholder).toBe(60);
    expect(tree.props.placeholder).not.toBeUndefined();
  });

  test("Should be 0% progress with no discount", () => {
    const component = renderer.create(
      <DiscountProcessBar actualDiscount={0} breakpoints={breakpoints} />
    );
    const tree = toJson(component);
    expect(tree.props.placeholder).toBe(0);
    expect(tree.props.placeholder).not.toBeUndefined();
  });
});
