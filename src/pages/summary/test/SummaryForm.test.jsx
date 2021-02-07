import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test("Check that the terms and conditions checkbox is unchecked and the button is disabled", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });

  // Checkbox is unchecked and button is disabled on startup
  expect(checkbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();
});

test("Check that checking the checkbox enables the button and unchecked disables it", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });

  // Checking the checkbox and see if the button is enabled
  userEvent.click(checkbox);
  expect(confirmOrderButton).toBeEnabled();

  // Un-checking the checkbox and see if the button is disabled
  userEvent.click(checkbox);
  expect(confirmOrderButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  let popover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(popover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);

  popover = await waitForElementToBeRemoved(() =>
    screen.getByText(/no ice cream will actually be delivered/i)
  );
});
