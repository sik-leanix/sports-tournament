import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()

const port: number = 3001

interface Tournament {
    id: string;
    name: string;
}

app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.send(tournaments.map(tournament => tournament.name).join(", "))
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})