export interface Tournament {
    "id": string;
    "name": string;
    "player_code": string;
    "admin_code": string;
    "description": string;
    "status"?: string;
    "url_slug": string;
};

export interface ReturnTournament {
    "id": string;
    "name": string;
    "description": string;
    "status"?: string;
    "url_slug": string;
}

export interface ReturnTournamentArray extends Array<ReturnTournament>{}