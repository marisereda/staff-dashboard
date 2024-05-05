import { NextFunction, Request, Response } from 'express';
import { AppRequest, AsyncHandler } from '~/common/types';

export const handler =
  (handler: AsyncHandler) =>
  async (req: Request | AppRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
