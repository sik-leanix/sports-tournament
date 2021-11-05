import { databaseConfig } from './database-config';
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  client: 'pg',
  connection: databaseConfig
};