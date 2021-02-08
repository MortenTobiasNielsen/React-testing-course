import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import OrderEntry from "../OrderEntry";

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
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // Check that the subtotal is $1.50 when the cherries checkbox is checked
  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  userEvent.click(cherriesCheckBox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // Check that the subtotal is $3.00 when the Hot Fudge is also checked
  const hotFudgeCheckBox = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // Check the the subtotal goes down to 0.00 again
  userEvent.click(cherriesCheckBox);
  userEvent.click(hotFudgeCheckBox);
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});

describe("Grand total", () => {
  test("Grand total starts out at $0.00 and updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: /i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    // Check that the grand total starts out at $0.00
    expect(grandTotal).toHaveTextContent("0.00");

    // Check that the grand total updates when multiple scoops are added
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("6.00");

    // Check that it also works when another type of scoop is added
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("10.00");

    // Check that it also works when toppings are added
    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("11.50");
  });

  test("Grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: /i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    // Check that it works when a topping is added first
    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("1.50");

    // Check that it also works when a scoop is added
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("7.50");

    // Check that it still works when another scoop is added
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("11.50");
  });

  test("Grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: /i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    // Check that the price will go down when items are removed
    userEvent.click(cherriesCheckBox);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    userEvent.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("4.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
