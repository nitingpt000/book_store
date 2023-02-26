import express from "express";
import helmet from "helmet";
import { APP_PORT } from "./config";
import constants from "./helpers/constants";
import routes from "./api/v1/routes";
import ErrorHandler from "./api/middlewares/errorHandler";
const app = express();
const { baseUrl } = constants;
// setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(expressWinston.logger())
app.use(`${baseUrl}`, routes);

app.use(ErrorHandler.clientErrorHandler);
app.use(ErrorHandler.commonErrorHandler);

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}.`);
});
