import { Request, Response } from 'express';
import { updateTournamentDal } from './dal';

export const putTournament =  async(req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const updatedBody = await updateTournamentDal(body, id);
    res.status(200);
    res.json(updatedBody);
};