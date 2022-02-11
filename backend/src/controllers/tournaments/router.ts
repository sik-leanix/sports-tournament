import express from "express";
import { postTournament } from "./post-tournament";
import { getTournamets } from "./get-tournaments";
import { deleteTournament } from "./delete-tournament";
import { putTournament } from "./put-tournament";

export const tournamentRoute = express.Router();

tournamentRoute.get("/", getTournamets);
tournamentRoute.post("/", postTournament);

tournamentRoute.delete("/:id", deleteTournament);
tournamentRoute.put("/:id", putTournament);