import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as UserController from '../controllers/user.controller';

class User {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.UserRouter();
  }

  private UserRouter(): void {
    // @Route POST /user/register
    // @DESC Register a user
    // @ACCESS PUBLIC
    this.router.post('/register', UserController.registerAdmin);
  }
}

export const UserApi = new User().router;
