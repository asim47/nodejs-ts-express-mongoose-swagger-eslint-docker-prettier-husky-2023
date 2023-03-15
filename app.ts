import dotenv from 'dotenv';
import express from 'express';
import mongoose, { connect, ConnectOptions } from 'mongoose';
import { jwtAuth } from './src/middlewares/apiAuth';
import cors from 'cors';
import { options } from './src/helpers/cors';
import { DB_STATES, versionNo } from './src/helpers/contants';
import { UserApi } from './src/routers/user.router';
import { connectDatabase } from './src/helpers/database';
import { HttpNotFound } from './src/helpers/httpResponse';
import { Logger } from './src/helpers/logger';
import expressPino, { HttpLogger } from 'pino-http';
import { LoggerLevel, Server, Swagger } from './src/helpers/env';
import helmet from 'helmet';
import xss from 'xss-clean';
import { superUserSeed } from './src/seeds/superUser.seed';
import SwaggerUI from 'swagger-ui-express';
import SwaggerDocs from './swagger.json';
import { CommonApi } from './src/routers/common.router';
class App {
  constructor() {
    this.app = express();
    this.expressLogger = expressPino({ logger: Logger, level: LoggerLevel.LOG_LEVEL, timestamp: true });
    this.middlewares();
    this.initDB();
    this.routes();
  }
  public app: express.Application;
  public expressLogger: HttpLogger;

  private middlewares(): void {
    Logger.info('Middlewares are being initialized...');
    this.app.use(xss());
    this.app.use(cors(options));
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(helmet());
    this.app.use(Swagger.PATH, SwaggerUI.serve, SwaggerUI.setup(SwaggerDocs));
    if (Server.IS_DEV_ENV) {
      // this.app.use(this.expressLogger)
    }
    Logger.info('Middlewares are initialized successfully...');
  }
  private async initDB(): Promise<void> {
    try {
      Logger.info('Initializing Database...');
      await connectDatabase();
      Logger.info('DB Connected Successfully');

      Logger.info('Initializing Seeds...');
      superUserSeed();
    } catch (error) {
      Logger.error(error);
      Logger.error('DB Connection failed');
    }
  }
  private routes(): void {
    Logger.info('Routes are being initialized...');

    this.app.use(`/api/${versionNo}/user`, UserApi);

    this.app.use(`/api/${versionNo}/common/`, CommonApi);
    this.app.use('*', (req: express.Request, res: express.Response): express.Response => {
      try {
        throw `the Endpoint ${req.originalUrl} with the method ${req.method} Is not hosted on our server!`;
      } catch (error) {
        return HttpNotFound(res, `Not Found`, error);
      }
    });
  }
}
export default new App().app;
