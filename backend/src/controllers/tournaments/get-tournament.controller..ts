import { Request, Response } from 'express';
import { getTournamet } from './tournament.dao';


export const getTournametController = async(req: Request, res: Response) => {
    const id = req.params.id;
    const tournament = await getTournamet(id);
    res.json(tournament);
};