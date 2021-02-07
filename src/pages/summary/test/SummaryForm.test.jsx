import { render, screen, fireEvent } from "@testing-library/react";

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
  fireEvent.click(checkbox);
  expect(confirmOrderButton).toBeEnabled();

  // Un-checking the checkbox and see if the button is disabled
  fireEvent.click(checkbox);
  expect(confirmOrderButton).toBeDisabled();
});
