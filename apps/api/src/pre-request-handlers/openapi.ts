import * as express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import path from "path";

const spec = path.join(__dirname, '../assets/openapi.json');

export const serveOpenapiSpec = express.static(spec);

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: spec,
  validateRequests: true,
  validateResponses: false,
});