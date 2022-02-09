import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()
interface Tournament {
    id: string;
    name: string;
    player_code: string;
    admin_code: string;
}

app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set('port', (process.env.PORT || 8000));

app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name", "player_code", "admin_code").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.json( { tournaments });
});

app.post('/tournaments', async(req: Request, res: Response) => {
    const body = req.body;
    const adminCode = body.admin_code;
    const playerCode = body.player_code;

    const adminHash = await bcrypt.hash(adminCode, 10);
    const playerHash = await bcrypt.hash(playerCode, 10);

    body.admin_code = adminHash;
    body.player_code = playerHash;

    for (let requiredParameter of ['name', 'player_code', 'admin_code']) {
        if (!body[requiredParameter]) {
          return res
            .status(422)
            .json({ error: `Expected format: { name: <String>, player_code: <String>, admin_code: <String> }. You're missing a "${requiredParameter}" property.` });
        }
    }
    
    try {
    const tournamentIdArray = await pg("tournament").insert(body).returning("id").then(function (id) { return id; });

    const tournamentId = tournamentIdArray[0];
    body.id = tournamentId;
    res.json(body);
    res.status(201);
    } catch (error) {
    res.status(500).json({ error });
    }
});

app.delete('/tournaments/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    await pg("tournament").where({ id: id}).delete();
    res.status(200);
    res.json("Deleted!")
});

app.put('/tournaments/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    await pg("tournament").where({ id: id}).update(body);
    res.status(200);
    res.json("Updated!")
});


app.listen(app.get('port'), function () {
    console.log(`App is running at http://localhost:${app.get('port')}`);
});

