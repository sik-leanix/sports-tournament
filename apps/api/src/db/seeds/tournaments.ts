import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tournament").del();

    // Inserts seed entries
    await knex("tournament").insert([
        { name: "Wimbledon", player_code: "1234", admin_code: "3456" }
    ]);
};
