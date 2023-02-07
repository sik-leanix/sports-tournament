
import { Knex } from 'knex';

interface ProcessEnvironmentVariables {
  POSTGRES_USER?: string;
  POSTGRES_DATABASE?: string;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
  POSTGRES_PASSWORD?: string;
}

const LOCAL_CONFIG = { // When changing this, also change the README.md!
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: parseFloat('5433'),
  password: 'secret',
  ssl: false
}

export function getDatabaseConfig(env: ProcessEnvironmentVariables): Knex.PgConnectionConfig {
  if (process.env.NODE_ENV !== 'production') {
    return LOCAL_CONFIG;
  }

  return {
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    port: parseFloat(env.POSTGRES_PORT ?? '5433'),
    password: env.POSTGRES_PASSWORD,
    ssl: true
  };
}

export const databaseConfig = getDatabaseConfig((process.env as unknown) as ProcessEnvironmentVariables);