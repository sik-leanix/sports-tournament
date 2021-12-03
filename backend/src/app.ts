import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';
import { renderFile, RenderOptions } from 'twig';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()
app.use(express.static('../frontend/static/'));
const port: number = 3001

interface Tournament {
    id: string;
    name: string;
    'joining-code': number;
}

app.get('/', async (req: Request, res: Response) => {
    renderFile("../frontend/home.html.twig", {}, (err, result) => {
        res.send(result);
    });
});

app.get('/create', async (req: Request, res: Response) => {
    renderFile("../frontend/createTournament.html.twig", {}, (err, result) => {
        res.send(result);
    });
});



app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.json( { tournaments });
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});

