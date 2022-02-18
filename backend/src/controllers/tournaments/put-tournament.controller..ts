import { Request, Response } from 'express';
import { updateTournament } from './tournament.dao';

export const putTournamentController =  async(req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    if (body.id) {
        res.status(405);
        res.end();
    } else {
        const updatedBody = await updateTournament(body, id);
        res.status(200);
        res.json(updatedBody);
    }
};