import { Request, Response } from 'express';
import { createTournamentDal } from './dal';

const bcrypt = require('bcrypt');

export const postTournament = async(req: Request, res: Response) => {
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
        const createdTournament = createTournamentDal(body);
        res.json(createdTournament);
        res.status(201);
    } catch (error) {
        res.status(500).json({ error });
    }
};