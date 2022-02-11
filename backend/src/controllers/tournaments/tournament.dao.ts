import { Tournament, CreateTournamentData } from './tournament-type';
import { pg } from "../../db/database";

export async function updateTournament(body: CreateTournamentData, id: string): Promise<Tournament> {
    await pg("tournament").where({ id: id}).update(body);
    //TODO: Input validation
    const updatedTournament = {
        id: id,
        name: body.name,
        description: body.description,
        status: body.status,
        url_slug: body.url_slug
    }
    return updatedTournament
}

export async function deleteTournament(id: string):Promise<void> {
    await pg.table<Tournament>("tournament").where({ id: id}).delete();
}


export async function getTournamets(): Promise <Tournament[]> {
    const tournament = await pg.table<Tournament>("tournament").select("id", "name", "player_code", "admin_code", "url_slug", "description", "status").from<Tournament>("tournament");
    return tournament
}


export async function createTournament(createTournamentData :CreateTournamentData): Promise <Tournament> {
    //TODO: Input validation
    const tournaments = await pg.table<Tournament>("tournament").insert(createTournamentData).returning(["id", "name", "description", "url_slug"]);
    return tournaments?.[0];
}
