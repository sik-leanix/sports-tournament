import { ProcessEnvironment } from './config.type';

export const processEnvironment = (process.env as unknown) as ProcessEnvironment;