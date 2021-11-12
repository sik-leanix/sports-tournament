import { Knex } from 'knex';

const testConfig: Knex.Config = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/production'
    },
    useNullAsDefault: true
  }
export { testConfig };