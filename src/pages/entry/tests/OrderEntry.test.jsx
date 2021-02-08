import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

test("Handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("That the order button is disabled when scoops are 0 and enabled with it is above", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // Check that the button is disabled by default
  const orderButton = screen.getByRole("button", { name: /Order Sundae/ });
  expect(orderButton).toBeDisabled();

  // Check that it gets enabled when a scoop is chosen
  const vanilla = await screen.findByRole("spinbutton", { name: /Vanilla/i });
  userEvent.clear(vanilla);
  userEvent.type(vanilla, "1");
  expect(orderButton).toBeEnabled();

  // Check that it goes back to disabled again if all scoops are removed
  userEvent.clear(vanilla);
  userEvent.type(vanilla, "0");
  expect(orderButton).toBeDisabled();
});
