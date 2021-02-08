import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/image/chocolate.png" },
        { name: "Vanilla", imagePath: "/image/vanilla.png" },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(
      ctx.json({ orderNumber: Math.floor(Math.random() * 10000000000) })
    );
  }),
];
