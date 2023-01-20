import { rest } from "msw";
import { url } from "./server";

export const handlers = [
  // Handles a POST /login request
  rest.post(url("/login"), (req, res, ctx) => {
    // Persist user's authentication in the session
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MjJAdGVzdC5jb20iLCJpYXQiOjE2NjIwNDM5NjcsImV4cCI6MTY2MjA0NDg2N30.YlexB9Cbxt2B5Eymdwyvfo-F-rTk376P5tSwzEut7VI"
    );
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  // Handles a GET /user request
  rest.get(url("/user"), (req, res, ctx) => {
    // Check if the user is authenticated in this local
    const isAuthenticated = localStorage.getItem("accessToken");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
