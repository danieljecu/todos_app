import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { UserRouter, ProjectRouter, TaskRouter, AuthRouter } from "./routers";
import cors from "cors";
import { verifyToken } from "./middlewares/checkJwt";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", AuthRouter);
app.all("*", verifyToken);
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
// will use /tasklist always under the project
app.use("/task", TaskRouter);

const swaggerDocument = YAML.load("./basic-api-doc.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
