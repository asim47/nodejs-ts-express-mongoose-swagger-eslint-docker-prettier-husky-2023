import { Request, Response, NextFunction, response } from 'express';
import { RegisterUserResponse, UserRegisterRequest } from '../interfaces';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { HttpServerError, HttpSuccess } from '../helpers/httpResponse';
import { Logger } from '../helpers/logger';
import { DB_STATES, versionNo } from '../helpers/contants';
import mongoose from 'mongoose';
import { Server } from '../helpers/env';

// @Route GET /common/status
// @DESC check status of the server and database
// @ACCESS PUBLIC
export const checkStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        Logger.info('Checking Server Status...');
        Logger.info('Server Running.');
        Logger.info('Checking DB Status...');
        Logger.info(`Checking DB Connection ${DB_STATES[mongoose.connection.readyState]}.`);
        return res.status(mongoose.connection.readyState === 1 ? 200 : 500).json({
            message: 'Server is running',
            environment: Server.ENVIRONMENT,
            versionNo: versionNo,
            dbStates: DB_STATES,
            dbState: mongoose.connection.readyState,
            connectionSuccess: mongoose.connection.readyState === 1,
        });
    } catch (error: any) {
        Logger.error(error?.toString() || "");
        return HttpServerError(res, 'Something broke on the server', error);
    }
};
