import { get } from "lodash";
import { DEBUG_MODE } from "../../config";
import {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import rest from "../../helpers/rest";
const clientErrorHandler = (err, req, res, next) => {
  const statusCode = get(err, "response.status");

  if (statusCode) {
    const statusText = get(err, "response.statusText");
    const message = get(err, "response.data");
    console.log(
      `Unhandled API error. Status: ${statusCode} ${statusText}. Message: ${message}`
    );
    console.log(`Request: ${req}`);
    console.log(`Response: ${res}`);
    return DEBUG_MODE
      ? rest.response.status400(res, message)
      : rest.response.status400(res, statusText);
  }

  return next(err);
};

const commonErrorHandler = (err, req, res, next) => {
  const statusCode = get(err, "res.statusCode");

  if (statusCode) {
    const statusText = get(err, "res.statusText");
    const message = get(err, "res.statusMessage");
    console.log(
      `Server error. Status: ${statusCode} ${statusText}. Message: ${message}`
    );
    return res.status(statusCode).json({ success: false, error: statusText });
  }

  console.log(err.stack);
  return next(err);
};

export default { clientErrorHandler, commonErrorHandler };
