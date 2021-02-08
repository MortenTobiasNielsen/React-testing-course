import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

test("Display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // Find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // Confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display images for each topping option form server", async () => {
  render(<Options optionType="toppings" />);

  // Find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /toppings$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // Confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries toppings",
    "M&Ms toppings",
    "Hot Fudge toppings",
  ]);
});

test("that the scoop total is not updated when input is invalid", async () => {
  render(<Options optionType="scoops" />);

  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });

  // Check that the scoop total is $0.00 when input is negative
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  expect(scoopSubtotal).toHaveTextContent("0.00");
});
