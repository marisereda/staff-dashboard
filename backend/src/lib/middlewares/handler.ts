import { NextFunction, Request, Response } from 'express';
import { AsyncHandler } from '~/types';

export const handler =
  (handler: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
