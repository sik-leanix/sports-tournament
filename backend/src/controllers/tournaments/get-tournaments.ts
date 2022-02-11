import { Request, Response } from 'express';
import { getTournametsDal } from './dal';


export const getTournamets = async(req: Request, res: Response) => {
    const tournaments = getTournametsDal();
    res.json( { tournaments });
};