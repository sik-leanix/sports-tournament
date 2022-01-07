
import { Knex } from 'knex';

interface ProcessEnvironmentVariables {
  PROD?: boolean;
  POSTGRES_USER?: string;
  POSTGRES_DATABASE?: string;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
  POSTGRES_PASSWORD?: string;
}

const LOCAL_CONFIG = { // When changing this, also change the README.md!
  user: 'sports_app',
  host: 'localhost',
  database: 'sports_tournament_dev',
  port: parseFloat('5432'),
  password: 'secret',
  ssl: false
}

export function getDatabaseConfig(env: ProcessEnvironmentVariables): Knex.PgConnectionConfig {
  if (!env.PROD) {
    return LOCAL_CONFIG;
  }

  return {
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    port: parseFloat(env.POSTGRES_PORT ?? '5432'),
    password: env.POSTGRES_PASSWORD,
    ssl: true
  };
}

export const databaseConfig = getDatabaseConfig((process.env as unknown) as ProcessEnvironmentVariables);