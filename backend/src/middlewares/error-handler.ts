import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../lib';

export const errorHandler = (
  error: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof HttpError) {
    res.status(error.code).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
