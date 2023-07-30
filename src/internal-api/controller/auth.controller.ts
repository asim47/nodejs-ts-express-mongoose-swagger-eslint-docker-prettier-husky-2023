import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';

export class AuthController {
  public router: express.Router;

  constructor() {
    Logger.info('Auth controller initialized...');
    this.router = express.Router();
    this.AuthRouter();
  }

  private AuthRouter(): void {
    this.router.post('/register', (req: Request, res: Response) => {
      let body;
      try {
        //
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
