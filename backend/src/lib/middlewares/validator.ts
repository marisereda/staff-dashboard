import { NextFunction, Response } from 'express';
import { ZodError, ZodType } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { AppRequest } from '../../types';
import { HttpError } from '../utils';

export const validator =
  <T extends ZodType>(schema: T) =>
  (req: AppRequest, _res: Response, next: NextFunction): void => {
    try {
      req.state = schema.parse(req);
      next();
    } catch (error) {
      const { message } = fromZodError(error as ZodError);
      next(new HttpError(400, message));
    }
  };
