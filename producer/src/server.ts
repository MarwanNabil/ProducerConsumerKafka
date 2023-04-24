//for enviroment variables
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { KAFKA_BROKER_URL, PORT } from "../config";
import bodyParser from "body-parser";
import producerRoutes from "./routes/index";
import { ResponseError } from "./helpers/responseError";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use(bodyParser.json());

app.use("/", producerRoutes);

//Handling Errors & Exceptions
app.use(
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message: message, data: data });
  }
);

try {
  app.listen(PORT, (): void => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
} catch (err) {
  console.log(err);
}
