import { Knex } from "knex";
import { ProcessEnvironment } from "./config.type";
import { devConfig } from "./dev.config";
import { processEnvironment } from "./process.env";
import prodConfig from "./prod.config";
import { testConfig } from "./test.config";

export function getConfig(env: ProcessEnvironment): Knex.Config {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    case 'production':
      return prodConfig;
  }
}

export const config = getConfig(processEnvironment);