import { Tournament, CreateTournamentData } from './tournament-type';
import { pg } from "../../db/database";

export async function updateTournament(body: CreateTournamentData, id: string): Promise<Tournament> {
    await pg("tournament").where({ id: id}).update(body);
    const data = await pg.table<Tournament>("tournament").select("id", "name", "description", "url_slug").where('id', id);
    const updatedTournament = data[0];
    return updatedTournament
}

export async function deleteTournament(id: string):Promise<void> {
    await pg.table<Tournament>("tournament").where({ id: id}).delete();
}


export async function getTournamets(): Promise <Tournament[]> {
    const tournament = await pg.table<Tournament>("tournament").select("id", "name", "url_slug", "description", "status");
    return tournament
}


export async function createTournament(createTournamentData :CreateTournamentData): Promise <Tournament> {
    const tournaments = await pg.table<Tournament>("tournament").insert(createTournamentData).returning(["id", "name", "description", "url_slug"]);
    return tournaments?.[0];
}

export async function getTournamet(id: string): Promise <Tournament> {
    const data = await pg.table<Tournament>("tournament").select("id", "name", "description", "url_slug").where('id', id);
    const tournament = data[0];
    return tournament
}