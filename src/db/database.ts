import knex from 'knex';
import { Pool } from 'pg';
import { databaseConfig } from './database-config';

export const pool = new Pool(databaseConfig);

export const pg = knex({
  client: 'pg',
  connection: () => databaseConfig,
  pool: { min: 2, max: 20 }
});

export async function accessDatabase(): Promise<boolean> {
  const result = await pg.raw('SELECT NOW()');
  return result.rowCount === 1;
}