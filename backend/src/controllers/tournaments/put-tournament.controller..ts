import { Request, Response } from 'express';
import { updateTournament } from './tournament.dao';
import { BadRequest } from 'express-openapi-validator/dist/openapi.validator';

export const putTournamentController =  async(req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    if (body.id) {
        res.status(400).json(new BadRequest({ path: "/tournament", message: 'Changing the ID is not allowed' }));
        res.end();
    } else {
        const updatedBody = await updateTournament(body, id);
        res.status(200);
        res.json(updatedBody);
    }
};