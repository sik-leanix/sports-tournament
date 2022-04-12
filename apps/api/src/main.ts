import express, { Application } from 'express';
import { tournamentRoute } from './controllers/tournaments/router';
import { sendErrorResponse } from "./error-handling/error-handler";
import { serveOpenapiSpec } from './pre-request-handlers/openapi';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express();


app.use(express.json());

const cors = require('cors');
app.use(cors());

app.set('port', (process.env.PORT || 8000));

app.use('/tournaments', tournamentRoute);

app.use(sendErrorResponse);

app.use("/openapi.json", serveOpenapiSpec);


app.listen(app.get('port'), function () {
    console.log(`App is running at http://localhost:${app.get('port')}/tournaments`);
});

