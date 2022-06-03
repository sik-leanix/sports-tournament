import { Request, Response } from 'express';
import { NotFound } from 'express-openapi-validator/dist/openapi.validator';
import { getTournamet } from './tournament.dao';

export const getTournametController = async (req: Request, res: Response) => {
  const urlSlug = req.params.urlSlug;
  const tournament = await getTournamet(urlSlug);
  if (tournament) {
    res.json(tournament);
  } else {
    res.status(404).json(new NotFound({ path: '/tournament', message: 'Tournament not found' }));
  }
};
