import express, { Application, Request, Response } from 'express'
import { pg } from './db/database';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express()
interface Tournament {
    id: string;
    name: string;
    player_code: string;
    admin_code: string;
}


app.use(express.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 8000));

app.get('/tournaments', async(req: Request, res: Response) => {
    const query = pg.select("id", "name", "player_code", "admin_code").from<Tournament>("tournament");
    const tournaments = await query;
    
    res.json( { tournaments });
});

app.post('/tournaments', async(req: Request, res: Response) => {
    const body = req.body;

    for (let requiredParameter of ['name', 'player_code', 'admin_code']) {
        if (!body[requiredParameter]) {
          return res
            .status(422)
            .send({ error: `Expected format: { name: <String>, player_code: <String>, admin_code: <String> }. You're missing a "${requiredParameter}" property.` });
        }
    }
    
    try {
    await pg("tournament").insert(body);
    res.send("Created!")
    res.status(201);
    } catch (error) {
    res.status(500).json({ error });
    }
});

app.delete('/tournaments/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    await pg("tournament").where({ id: id}).delete();
    res.status(201);
    res.send("Deleted!")
});

app.put('/tournaments/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    await pg("tournament").where({ id: id}).update(body);
    res.status(201);
    res.send("Updated!")
});


app.listen(app.get('port'), function () {
    console.log(`App is running at http://localhost:${app.get('port')}`);
});

