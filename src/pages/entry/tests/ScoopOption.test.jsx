import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../ScoopOption";

test("that scoop input turns red on invalid amount", () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn} />);

  // Check that the input is not red in the beginning
  const vanillaInput = screen.getByRole("spinbutton");
  expect(vanillaInput).not.toHaveClass("is-invalid");

  // Check that the input turns red with a negative number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // Check that the input turns red with a decimal number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // Check that the input turns red with a number too large
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // Check that the input turns red with a blank entry
  userEvent.clear(vanillaInput);
  expect(vanillaInput).toHaveClass("is-invalid");

  // Check that the input turns back with the entry is valid again
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
