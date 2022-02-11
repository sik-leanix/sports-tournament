import { Tournament, ReturnTournament,  ReturnTournamentArray} from "./tournament-type";
import { pg } from "../../db/database";

export async function updateTournamentDal(body: Tournament, id: string): Promise<ReturnTournament> {
    await pg("tournament").where({ id: id}).update(body);
    const updatedTournament = {
        "id": id,
        "name": body.name,
        "description": body.description,
        "status": body.status,
        "url_slug": body.url_slug
    }
    return updatedTournament
}

export async function deleteTournamentDal(id: string):Promise<void> {
    await pg("tournament").where({ id: id}).delete();
}


export async function getTournametsDal(): Promise <ReturnTournamentArray> {
    const tournament = await pg.select("id", "name", "player_code", "admin_code", "url_slug", "description", "status").from<Tournament>("tournament");
    return tournament
}


export async function createTournamentDal(body :Tournament): Promise <ReturnTournament> {
    const tournamentIdArray = await pg("tournament").insert(body).returning("id").then(function (id) { return id; });
    const tournamentId = tournamentIdArray[0];
    body.id = tournamentId;
    const returnTournament = {
        "id": body.id,
        "name": body.name,
        "description": body.description,
        "url_slug": body.url_slug
    }
    return returnTournament
}
