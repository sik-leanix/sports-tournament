import express from 'express';
import { bookmarkRoute } from './controllers/bookmark.router';
import { sendErrorResponse } from './error-handling/error-handler';
import { serveOpenapiSpec } from './pre-request-handlers/openapi';

const app = express();

app.use(express.json());

app.use('/openapi.json', serveOpenapiSpec);

app.use('/bookmarks', bookmarkRoute);

app.use(sendErrorResponse);

export default app;
