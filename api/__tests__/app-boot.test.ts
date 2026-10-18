/**
 * App Boot Test
 * 
 * This test ensures the Express app can boot successfully with all routers mounted.
 * It catches issues like:
 * - Express 5 path-to-regexp rejecting regex patterns in routes
 * - Middleware configuration errors
 * - Module import failures
 * - Route definition errors
 * 
 * Note: We don't import the full index.ts because it starts the server with app.listen(),
 * which prevents Jest from exiting. Instead, we verify that all routers can be mounted.
 */

import express from "express";
import bodyParser from "body-parser";
import { UserRouter, ProjectRouter, TaskRouter, AuthRouter } from "../routers";
import { verifyToken } from "../middlewares/checkJwt";

describe("App Boot", () => {
  it("should mount all routers without path-to-regexp errors (Express 5)", () => {
    const app = express();
    app.use(bodyParser.json());
    
    // These should not throw with Express 5
    // Express 5 rejects regex patterns like /:id([0-9]+) in string paths
    expect(() => {
      app.use("/", AuthRouter);
      app.use("/user", verifyToken, UserRouter);
      app.use("/project", verifyToken, ProjectRouter);
      app.use("/task", verifyToken, TaskRouter);
    }).not.toThrow();
  });

  it("should successfully create app instance with all middleware", () => {
    const app = express();
    
    expect(() => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use("/", AuthRouter);
      app.use("/user", verifyToken, UserRouter);
      app.use("/project", verifyToken, ProjectRouter);
      app.use("/task", verifyToken, TaskRouter);
    }).not.toThrow();
    
    // Verify app was created
    expect(app).toBeDefined();
  });
});
