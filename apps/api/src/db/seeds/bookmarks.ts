import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("bookmarks").del();

    // Inserts seed entries
    await knex("bookmarks").insert([
        { id: uuidv4(), created_at: new Date(), updated_at: new Date(), name: "Cheesecake recipe", url: "https://www.xkons.de/kuchen/" }
    ]);
};