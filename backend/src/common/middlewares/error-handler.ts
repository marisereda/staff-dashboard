import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '~/common/errors';

const fromPrismaError = (error: PrismaClientKnownRequestError): string => {
  console.log('❌ Prisma error:', error);
  if (error.meta) {
    return `${error.meta?.['modelName']}: ${error.meta?.['cause']}`;
  }
  return error.message;
};

export const errorHandler = (
  error: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof HttpError) {
    res.status(error.code).json({ message: error.message });
  } else if (error instanceof PrismaClientKnownRequestError) {
    res.status(404).json({ message: fromPrismaError(error) });
  } else {
    console.log('❌ Unknown error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
