import { NextFunction, Response } from 'express';
import { HttpError } from '~/lib/utils';
import { AppRequest } from '~/types';
import { CreateEmployer, EmployerById, GetEmployers, UpdateEmployer } from './employers.schema';
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

export const create = async (req: AppRequest<CreateEmployer>, res: Response): Promise<void> => {
  const employer = await employersService.create(req.state!.body);
  res.status(200).json(employer);
};

export const update = async (req: AppRequest<UpdateEmployer>, res: Response): Promise<void> => {
  const employer = await employersService.update({
    params: req.state!.params,
    body: req.state!.body,
  });
  res.status(200).json(employer);
};

export const deleteOne = async (req: AppRequest<EmployerById>, res: Response): Promise<void> => {
  await employersService.deleteOne(req.state!.params.id);
  res.status(204).end();
};
