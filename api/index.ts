import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { UserRouter, ProjectRouter, TaskRouter, AuthRouter } from "./routers";
import cors from "cors";
import { verifyToken } from "./middlewares/checkJwt";
import Logger from "./utils/logger";
import morganMiddleware from "./middlewares/morganMiddleware";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(morganMiddleware);
const corsOrigin = process.env.CORS_ORIGIN?.split(",");
if (!corsOrigin && process.env.NODE_ENV === "production") {
  throw new Error("CORS_ORIGIN must be set in production");
}
// dev/test (no CORS_ORIGIN) reflects the request origin; prod uses the allow-list
app.use(cors({ origin: corsOrigin ?? true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDocument = YAML.load("./basic-api-doc.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>todos-api</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 80px auto; padding: 0 24px; color: #222; }
    h1 { font-size: 1.4rem; margin-bottom: 8px; }
    p { color: #666; margin-bottom: 32px; }
    a { display: block; padding: 12px 16px; margin-bottom: 12px; border: 1px solid #ddd;
        border-radius: 6px; text-decoration: none; color: #222; }
    a:hover { background: #f5f5f5; }
    a span { float: right; color: #999; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>todos-api</h1>
  <p>Node.js · Express · Prisma · Neon</p>
  <a href="/api-docs">API Docs <span>Swagger UI →</span></a>
  <a href="/health">Health check <span>/health →</span></a>
  <a href="/logger">Logger test <span>/logger →</span></a>
</body>
</html>`);
});
app.get("/health", (_, res) => res.send("ok"));

app.get("/logger", (_, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Hello world");
});

app.use("/", AuthRouter);
app.use("/user", UserRouter, verifyToken);
app.use("/project", ProjectRouter, verifyToken);
// will use /tasklist always under the project
app.use("/task", TaskRouter, verifyToken);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
