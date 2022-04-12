import knex from 'knex';
import { environment } from '../environments/environment';

export const defaultConnection = {
  user: process.env.POSTGRES_USER ?? 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  database: process.env.POSTGRES_DATABASE ?? 'postgres',
  port: parseFloat(process.env.POSTGRES_PORT ?? '5433'),
  password: process.env.POSTGRES_PASSWORD ?? 'secret',
};

export const postgres = knex({
  client: 'pg',
  connection: environment.production
    ? process.env.DATABASE_URL
    : () => defaultConnection,
  pool: { min: 2, max: 20 },
});
