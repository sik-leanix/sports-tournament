import { Request, Response } from 'express';
import { getTournamets } from './tournament.dao';


export const getTournametsController = async(req: Request, res: Response) => {
    const tournaments = await getTournamets();
    res.json( { tournaments });
};