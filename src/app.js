import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";

const app = express();

// configure express
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public"));

// configure cors
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
    credentials: true,
  }),
);

// cofigure logger
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseTime] = message.trim().split(" ");
        logger.info(JSON.stringify({ method, url, status, responseTime }));
      },
    },
  }),
);

export default app;
