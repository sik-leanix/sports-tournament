import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tournament").del();

    // Inserts seed entries
    await knex("tournament").insert([
        { id: 1, name: "Wimbledon" },
        { id: 2, name: "Australian Open" },
        { id: 3, name: "US Open" },
    ]);
};
