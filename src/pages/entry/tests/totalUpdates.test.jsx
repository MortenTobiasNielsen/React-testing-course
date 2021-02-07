import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

test("Update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // Make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("Update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // Make sure the subtotal start at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // Check that the subtotal is $1.50 when the cherries checkbox is checked
  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  userEvent.click(cherriesCheckBox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // Check that the subtotal is $3.00 when the Hot Fudge is also checked
  const hotFudgeCheckBox = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // Check the the subtotal goes down to 0.00 again
  userEvent.click(cherriesCheckBox);
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsTotal).toHaveTextContent("0.00");
});
