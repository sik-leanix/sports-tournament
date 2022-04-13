import { databaseConfig } from './database-config';
const dotenv = require('dotenv');
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  client: 'pg',
  connection: isProd ? process.env.DATABASE_URL : databaseConfig,
  seeds: {
    directory: './seeds/'
  }
};