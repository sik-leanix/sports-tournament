import { Knex } from 'knex';

const devConfig: Knex.Config = {
    client: 'pg',
    connection:'postgres://localhost/sports_tournament',
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
}
export { devConfig };