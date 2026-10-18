import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { UserRouter, ProjectRouter, TaskRouter, AuthRouter } from "../routers";
import { verifyToken } from "../middlewares/checkJwt";
import dotenv from "dotenv";

dotenv.config();

describe("Auth Middleware Integration", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());

    // Mount routes with correct middleware ordering
    app.use("/", AuthRouter);
    app.use("/user", verifyToken, UserRouter);
    app.use("/project", verifyToken, ProjectRouter);
    app.use("/task", verifyToken, TaskRouter);
  });

  describe("Protected Routes - User", () => {
    it("GET /user should return 401 without token", async () => {
      const response = await request(app).get("/user");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("err");
    });

    it("GET /user/:id should return 401 without token", async () => {
      const response = await request(app).get("/user/1");
      expect(response.status).toBe(401);
    });

    it("GET /user should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/user")
        .set("Authorization", "Bearer invalid-token");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("Protected Routes - Project", () => {
    it("GET /project should return 401 without token", async () => {
      const response = await request(app).get("/project");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("err");
    });

    it("POST /project should return 401 without token", async () => {
      const response = await request(app)
        .post("/project")
        .send({ name: "Test Project" });
      expect(response.status).toBe(401);
    });

    it("GET /project/:id should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/project/1")
        .set("Authorization", "Bearer invalid-token");
      expect(response.status).toBe(401);
    });
  });

  describe("Protected Routes - Task", () => {
    it("GET /task should return 401 without token", async () => {
      const response = await request(app).get("/task");
      expect(response.status).toBe(401);
    });

    it("POST /task should return 401 without token", async () => {
      const response = await request(app)
        .post("/task")
        .send({ title: "Test Task" });
      expect(response.status).toBe(401);
    });
  });

  describe("Public Routes - Auth", () => {
    it("POST /login should be accessible without token", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });
      // Should not return 401 for missing token (may return 401 for invalid credentials)
      // The key is that it processes the request, not immediately rejects for missing token
      expect(response.status).not.toBe(401);
    });

    it("POST /register should be accessible without token", async () => {
      const response = await request(app)
        .post("/register")
        .send({ username: "test", email: "test@example.com", password: "pwd" });
      // Should process the request (may fail validation, but not auth)
      expect(response.status).not.toBe(401);
    });
  });
});
