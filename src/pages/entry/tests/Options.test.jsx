import { render, screen } from "../../../test-utils/testing-library-utils";

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
