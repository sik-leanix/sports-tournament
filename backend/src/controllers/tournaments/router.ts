import express from "express";
import { validateInputs } from "../../pre-request-handlers/openapi";
import { postTournamentController } from "./post-tournament.controller.";
import { getTournametsController } from "./get-tournaments.controller.";
import { deleteTournamentController } from "./delete-tournament.controller";
import { putTournamentController } from "./put-tournament.controller.";

export const tournamentRoute = express.Router();

tournamentRoute.use(validateInputs);
tournamentRoute.get("/", getTournametsController);
tournamentRoute.post("/", postTournamentController);

tournamentRoute.delete("/:id", deleteTournamentController);
tournamentRoute.put("/:id", putTournamentController);