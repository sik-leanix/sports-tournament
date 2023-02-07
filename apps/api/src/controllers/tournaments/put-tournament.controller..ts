import { Request, Response } from 'express';
import { updateTournament } from './tournament.dao';
import { BadRequest } from 'express-openapi-validator/dist/openapi.validator';

export const putTournamentController = async (req: Request, res: Response) => {
  const urlSlug = req.params.urlSlug;
  const body = req.body;
  if (body.urlSlug) {
    res.status(400).json(new BadRequest({ path: '/tournament', message: 'Changing the ID is not allowed' }));
  } else {
    const updatedBody = await updateTournament(body, urlSlug);
    res.status(200);
    res.json(updatedBody);
  }
};
