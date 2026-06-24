import dotenv from "dotenv";
import app from "./app.js";
import logger from "./utils/logger.js";
import { apiResponse } from "./utils/apiResponse.js";
import { apiError } from "./utils/apiError.js";

dotenv.config({ path: "./.env" });

// handle server error
const port = process.env.PORT;
app
  .listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  })
  .on("error", (error) => {
    logger.error(error.message);
  });
