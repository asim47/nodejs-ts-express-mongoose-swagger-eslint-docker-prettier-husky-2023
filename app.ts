import express from 'express';
import { versionNo } from './src/helpers/contants';
import { connectDatabase } from './src/helpers/database';
import { Logger } from './src/helpers/logger';
import { Swagger } from './src/helpers/env';
import helmet from 'helmet';
import xss from 'xss-clean';
import SwaggerUI from 'swagger-ui-express';
import SwaggerDocs from './swagger.json';
import { ApiController } from './src/internal-api/controller';
import { SeedsController } from './src/seeds/seeds.controller';
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.initDB();
    this.routes();
  }
  public app: express.Application;

  private middlewares(): void {
    Logger.info('Middlewares are being initialized...');
    this.app.use(xss());
    this.app.use(helmet());
    this.app.use(Swagger.PATH, SwaggerUI.serve, SwaggerUI.setup(SwaggerDocs));
    Logger.info('Middlewares are initialized successfully...');
  }
  private async initDB(): Promise<void> {
    try {
      Logger.info('Initializing Database...');
      await connectDatabase();
      Logger.info('DB Connected Successfully');

      const seeds = new SeedsController();
      seeds.initSeeds();
    } catch (error) {
      Logger.error(error);
      Logger.error('DB Connection failed');
    }
  }
  private routes(): void {
    Logger.info('Routes are being initialized...');

    this.app.use(`/api/${versionNo}/internal`, new ApiController().router);

    Logger.info('Routes initialized successfully...');
  }
}
export default new App().app;
