import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tournament', (table) => {
    table.string('id').primary();
    table.string('name', 250).notNullable();
    table.string('player_code', 250).notNullable();
    table.string('admin_code', 250).notNullable();
    table.string('url_slug', 250)
    table.string('description', 250)
    table.string('status', 250)
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tournament');
}