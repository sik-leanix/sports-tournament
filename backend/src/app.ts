import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()
const port: number = 3001
interface Tournament {
    id: string;
    name: string;
    'joining-code': number;
}

app.use(express.static('./static/'));

app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.json( { tournaments });
});

app.listen(port, function () {
    console.log(`App is running at http://localhost:3001`);
});

