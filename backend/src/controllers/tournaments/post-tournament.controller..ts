import { Request, Response } from 'express';
import { createTournament } from './tournament.dao';
import { v4 as uuidv4 } from 'uuid';

const bcrypt = require('bcrypt');

export const postTournamentController = async(req: Request, res: Response) => {
    const body = req.body;
    const adminCode = body.admin_code;
    const playerCode = body.player_code;

    const adminHash = await bcrypt.hash(adminCode, 10);
    const playerHash = await bcrypt.hash(playerCode, 10);

    body.id = uuidv4();
    body.admin_code = adminHash;
    body.player_code = playerHash;
    
    try {
        const createdTournament = await createTournament(body);
        res.json(createdTournament);
        res.status(201);
    } catch (error) {
        res.status(500).json({ error });
    }
};