import { Document } from 'mongoose';

export interface UserRegisterRequest extends Request {
  Name: string;
  Email: string;
  Password: string;
}

export interface RegisterUserResponse {
  Error: boolean;
  Msg: string;
  Exception: object | string | null;
  ExceptionString: string;
  Token: string;
  UserData: null;
}

export interface UserModelInterface extends Document {
  Name: string;
  Email: string;
  Password: string;
}
