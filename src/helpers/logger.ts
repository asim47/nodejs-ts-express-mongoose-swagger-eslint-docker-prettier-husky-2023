import pino from 'pino';
import pretty from 'pino-pretty';
import { Server } from './env';

const stream = pretty({
  colorize: true,
});

export const Logger = pino(Server.IS_DEV_ENV ? stream : undefined);
