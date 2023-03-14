import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { Jwt } from '../helpers/env';

//Checks for a login user
export const jwtAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    const token: string = req.headers['user-token']?.toString() || '';

    if (!token) return res.status(400).json({ Error: 'true', Msg: 'No Authenticated User Token Provided' });

    const decoded: any = JWT.verify(token, Jwt.JWT_SECRET || '');

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ Error: true, Msg: 'User Token Is Invalid or Expired!' });
  }
};
