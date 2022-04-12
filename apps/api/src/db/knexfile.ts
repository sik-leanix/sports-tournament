import { environment } from '../environments/environment';
import { defaultConnection } from './database';

module.exports = {
  client: 'pg',
  connection: environment.production
    ? process.env.DATABASE_URL
    : defaultConnection,
  seeds: {
    directory: __dirname + '/seeds',
  },
  migrations: {
    directory: __dirname + '/migrations',
  },
};
