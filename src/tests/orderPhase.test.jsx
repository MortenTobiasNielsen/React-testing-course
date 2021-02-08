import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phase for happy path", async () => {
  // Render app
  render(<App />);

  // Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });
  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  userEvent.click(cherriesCheckBox);

  // Find and click order button
  const OrderButton = screen.getByRole("button", { name: /Order/i });
  userEvent.click(OrderButton);

  // Check summary information based on order
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopSubtotal = screen.getByRole("heading", { name: /Scoops: \$/i });
  expect(scoopSubtotal).toHaveTextContent("$2.00");

  const toppingSubtotal = screen.getByRole("heading", {
    name: /Toppings: \$/i,
  });
  expect(toppingSubtotal).toHaveTextContent("$1.50");

  //   const grandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });
  //   expect(grandTotal).toHaveTextContent("$3.50");

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // Accept terms and conditions and click button to confirm order
  const TermsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /Confirm/i });
  userEvent.click(TermsAndConditions);
  userEvent.click(confirmButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // Click "new order" button to confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /Thank You/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/Order Number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole("button", { name: /New order/i });
  userEvent.click(newOrderButton);

  // Check that scoops and toppings subtotals have been reset
  const scoopTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopTotal).toBeInTheDocument();

  const toppingTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingTotal).toBeInTheDocument();

  const newGrandTotal = screen.getByText("Grand total: $0.00");
  expect(newGrandTotal).toBeInTheDocument();

  // Do we need to await anything to avoid test errors?
  await screen.findByRole("spinbutton", { name: /Vanilla/i });
  await screen.findByRole("checkbox", { name: /Cherries/i });
});

test("Check that toppings are not rendered in the summary if none is chosen", async () => {
  // Render app
  render(<App />);

  // Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  // Find and click order button
  const OrderButton = screen.getByRole("button", { name: /Order/i });
  userEvent.click(OrderButton);

  // Check toppings header is not there
  const toppingsHeading = screen.queryByRole("heading", {
    name: /Toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
