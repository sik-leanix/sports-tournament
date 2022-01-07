import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()
interface Tournament {
    id: string;
    name: string;
    'joining-code': number;
}

app.set('port', (process.env.PORT || 5000));

app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.json( { tournaments });
});

app.listen(app.get('port'), function () {
    console.log(`App is running at http://localhost:${app.get('port')}`);
});

