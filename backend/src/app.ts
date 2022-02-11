import express, { Application } from 'express'
import { tournamentRoute } from './controllers/tournaments/router';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express();


app.use(express.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set('port', (process.env.PORT || 8000));

app.use('/tournaments', tournamentRoute);

app.listen(app.get('port'), function () {
    console.log(`App is running at http://localhost:${app.get('port')}`);
});

