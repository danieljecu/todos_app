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
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDocument = YAML.load("./basic-api-doc.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
