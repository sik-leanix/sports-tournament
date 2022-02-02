import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tournament', (table) => {
    table.increments('id').notNullable().unique();
    table.string('name', 250).notNullable();
    table.string('player_code', 250).notNullable();
    table.string('admin_code', 250).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tournament');
}