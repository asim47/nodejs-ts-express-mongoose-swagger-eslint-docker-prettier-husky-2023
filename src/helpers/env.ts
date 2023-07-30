import dotenv from 'dotenv';
dotenv.config();

import Path from 'path';
import Process from 'process';

export const Server = {
  PORT: parseInt(Process.env.PORT as string) || 8000,
  ENVIRONMENT: Process.env.ENV as string,
  IS_DEV_ENV: Process.env.ENV === 'DEV',
};

export const Jwt = {
  JWT_SECRET: Process.env.jwtSecret as string,
};

export const LoggerLevel = {
  LOG_LEVEL: Process.env.LOG_LEVEL || 'debug',
};

export const Database = {
  DB_URL: Process.env.DB_URL as string,
};

export const Swagger = {
  PATH: '/api-docs',
};
