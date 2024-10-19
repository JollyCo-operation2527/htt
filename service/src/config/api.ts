import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { router, notFound, errorHandler } from "../api";

require('dotenv').config();
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Accessing variables
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

class Application {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.set("host", process.env.HOST || "localhost");
    this.server.set("port", process.env.PORT || 5000);
    this.server.use(morgan("dev"));
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/api/v1", router);
    this.server.use(notFound);
    this.server.use(errorHandler);
  }

  public start(): void {
    const host: string = this.server.get("host");
    const port: number = this.server.get("port");

    this.server.listen(port, host, () => {
      console.log(`Server started at http://${host}:${port}`);
    });
  }
}

const app: Application = new Application();

app.start();
