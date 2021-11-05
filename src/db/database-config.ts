
import { ProcessEnvironment } from './configs/config.type';

interface ProcessEnvironmentVariables {
  ENV?: ProcessEnvironment;
  POSTGRES_USER?: string;
  POSTGRES_DATABASE?: string;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
  POSTGRES_PASSWORD?: string;
}


export function getDatabaseConfig(env: ProcessEnvironmentVariables) {
  const environment = env.ENV || 'local';
  return {
    user: env.POSTGRES_USER ?? 'pgadminuser',
    host: env.POSTGRES_HOST ?? 'localhost',
    database: env.POSTGRES_DATABASE ?? 'sports_tournament_test',
    port: parseFloat(env.POSTGRES_PORT ?? '5432'),
    password: env.POSTGRES_PASSWORD ?? 'secret',
    ssl: environment === "production"
  };
}

export const databaseConfig = getDatabaseConfig((process.env as unknown) as ProcessEnvironmentVariables);