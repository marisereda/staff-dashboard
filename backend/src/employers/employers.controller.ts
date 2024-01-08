import { NextFunction, Response } from 'express';
import { HttpError } from '~/lib/utils';
import { AppRequest } from '~/types';
import { EmployerById, GetEmployers } from './employers.schema';
import * as employersService from './employers.service';

export const getAll = async (req: AppRequest<GetEmployers>, res: Response): Promise<void> => {
  const result = await employersService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (
  req: AppRequest<EmployerById>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const employer = await employersService.getById(req.state!.params.id);

  if (!employer) {
    return next(new HttpError(404, 'Employer not found'));
  }

  res.status(200).json(employer);
};
