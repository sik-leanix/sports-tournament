import path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import * as express from "express";

const spec = path.join("assets", "openapi.json");

export const serveOpenapiSpec = express.static(spec);

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: spec,
  validateRequests: true,
  validateResponses: true,
});