import { Request, Response, NextFunction, response } from 'express';
import { RegisterUserResponse, UserRegisterRequest } from '../interfaces';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { HttpServerError, HttpSuccess } from '../helpers/httpResponse';

// @Route POST /user/register
// @DESC Register a user
// @ACCESS AUTH
export const registerAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    return HttpSuccess(res, {}, 'User Registered Successfully');
  } catch (error: any) {
    return HttpServerError(res, 'Something broke on the server', error);
  }
};
