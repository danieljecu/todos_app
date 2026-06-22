import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const url = (path) => {
  return `http://localhost:3000${path}`;
};

export const server = setupServer(...handlers);
