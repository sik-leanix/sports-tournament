import { Request, Response } from 'express';
import { deleteTournament } from './tournament.dao';

export const deleteTournamentController = async (req: Request, res: Response) => {
  //TODO: Require tournament admin password for deletion e.g DELETE /tournaments/:id?code=323123
  const urlSlug = req.params.urlSlug;
  await deleteTournament(urlSlug);
  res.status(204);
  res.end();
};
