import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tournaments").del();

    // Inserts seed entries
    await knex("tournaments").insert([
        { id: 1, name: "Wimbledon" },
        { id: 2, name: "Australian Open" }
    ]);
};
