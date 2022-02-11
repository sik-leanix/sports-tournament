import { Request, Response } from 'express';
import { deleteTournament } from './tournament.dao';

export const deleteTournamentController= async(req: Request, res: Response) => {
    //TODO: Require tournament admin password for deletion e.g DELETE /tournaments/:id?code=323123
    const id = req.params.id;
    await deleteTournament(id)
    res.status(204);
};