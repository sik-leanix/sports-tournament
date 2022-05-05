import { Request, Response } from 'express';
import { getTournamet } from './tournament.dao';

export const getTournametController = async (req: Request, res: Response) => {
  const urlSlug = req.params.urlSlug;
  const tournament = await getTournamet(urlSlug);
  res.json(tournament);
};
