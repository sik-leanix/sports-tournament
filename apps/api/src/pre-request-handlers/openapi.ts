import * as OpenApiValidator from 'express-openapi-validator';
import express from 'express';
import { environment } from '../environments/environment';
import path from 'path';

const openApiSpec = path.join(__dirname, '../assets/openapi.json');

export const serveOpenapiSpec = express.static(openApiSpec);

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: openApiSpec,
  validateRequests: true,
  validateResponses: environment.production,
});
