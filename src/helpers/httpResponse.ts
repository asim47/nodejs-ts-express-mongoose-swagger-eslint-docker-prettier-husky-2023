import { Request, Response, NextFunction, response } from 'express';
import { Logger } from './logger';

export const HttpSuccess = (res: Response, data: any, msg?: string): Response => {
  Logger.info(`Success: ${msg}`);
  return res.status(200).json({
    Error: false,
    Msg: msg || 'Success',
    Exception: null,
    ExceptionString: '',
    Data: data,
  });
};

export const HttpNotFound = (res: Response, msg?: string, error?: any): Response => {
  Logger.error(`Not Found: ${msg}`);
  return res.status(404).json({
    Error: true,
    Msg: msg || 'Not Found',
    Exception: error,
    ExceptionString: error?.toString(),
  });
};

export const HttpBadRequest = (res: Response, msg?: string, error?: any): Response => {
  Logger.error(`Bad Request: ${msg}`);
  return res.status(400).json({
    Error: true,
    Msg: msg || 'Bad Request',
    Exception: error,
    ExceptionString: error?.toString() || "",
  });
};

export const HttpServerError = (res: Response, msg?: string, error?: any): Response => {
  Logger.error(`Internal Server Error: ${msg}`);
  return res.status(500).json({
    Error: true,
    Msg: msg || 'Bad Request',
    Exception: error,
    ExceptionString: error?.toString() || "",
  });
};

export const HttpCustomError = (res: Response, statusCode: number, msg: string, error: any, data?: any): Response => {
  Logger.error(`Custom Error: ${msg}`);
  return res.status(statusCode).json({
    Error: true,
    Msg: msg,
    Exception: error,
    ExceptionString: error?.toString() || "",
    Data: data,
  });
};
