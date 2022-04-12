import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('bookmarks', (table) => {
      table.uuid('id').primary();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
      table.string('name', 255).notNullable();
      table.string('url', 500).notNullable();
      table.string('notes', 1000).nullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('bookmarks');
}
