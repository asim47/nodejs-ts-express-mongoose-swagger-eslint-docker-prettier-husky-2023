import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import { CommonService } from '../services/common.service';

export class CommonController {
  public router: express.Router;

  constructor() {
    Logger.info('Common controller initialized...');
    this.router = express.Router();
    this.CommonRouter();
  }

  private CommonRouter(): void {
    this.router.get('/status', (req: Request, res: Response) => {
      let body;
      try {
        const service = new CommonService();

        const response = service.GetHealthStatus();

        body = {
          data: response,
        };
      } catch (error) {
        Logger.error('Api Error', error);
        if (error instanceof AppError) {
          const appError = error as AppError;
          res.statusCode = appError.statusCode;
          body = { error: appError.message, name: appError.name };
        } else {
          res.statusCode = 500;
          body = { error: 'Internal Server Error' };
        }
      }
      res.json(body);
    });
  }
}
