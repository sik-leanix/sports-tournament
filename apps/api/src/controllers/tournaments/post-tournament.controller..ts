import { Request, response, Response } from 'express';
import { createTournament } from './tournament.dao';
import { v4 as uuidv4 } from 'uuid';
import { BadRequest, Forbidden, InternalServerError } from 'express-openapi-validator/dist/openapi.validator';
import { isPostgresError, PostgresError } from '../../error-handling/postgres-error.interface';

const bcrypt = require('bcrypt');

export const postTournamentController = async(req: Request, res: Response) => {
    const body = req.body;
    const name = body.name;
    const adminCode = body.admin_code;
    const playerCode = body.player_code;

    body.id = uuidv4();

    if(body.url_slug) {
        const urlSlug = body.url_slug;
        const updatedUrlSlug = urlSlug.trim().replace(/\s+/g, '-').toLowerCase();
        body.url_slug = updatedUrlSlug;
    } else {
        let urlSlug = name.trim().replace(/\s+/g, '-').toLowerCase();
        body.url_slug = urlSlug;
    }

    if (playerCode) {
        const playerHash = await bcrypt.hash(playerCode, 10);
        body.player_code = playerHash;
    }

    const adminHash = await bcrypt.hash(adminCode, 10);
    body.admin_code = adminHash;
    
    try {
        const createdTournament = await createTournament(body);
        res.status(201);
        res.json(createdTournament);
    } catch (error) {
        if (isPostgresError(error)) {
            if (error.constraint === 'unique_url_slug') {
                res.status(403).json(new Forbidden({ path: "/tournament", message: error.detail }));
            } else {
                res.status(500).json(new InternalServerError({ path: "/tournament", message: error.detail }));
            }
        } else {
            res.status(500).json(new InternalServerError({ path: "/tournament", message: "Unexpected error occurred:" + JSON.stringify(error) }));
        }
        
    }
};