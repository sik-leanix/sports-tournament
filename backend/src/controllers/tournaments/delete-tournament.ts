import { Request, Response } from 'express';
import { deleteTournamentDal } from './dal';

export const deleteTournament = async(req: Request, res: Response) => {
    const id = req.params.id;
    deleteTournamentDal(id)
    res.status(200);
    res.json("Deleted!")
};