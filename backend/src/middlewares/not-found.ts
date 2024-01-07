import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../lib';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void =>
  next(new HttpError(404, 'Not Found'));
