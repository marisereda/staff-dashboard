import { NextFunction, Response } from 'express';
import { HttpError } from '../lib';
import { GetEmployeeById, GetEmployees } from '../schemas';
import * as employeesService from '../services';
import { AppRequest } from '../types';

export const getAll = async (req: AppRequest<GetEmployees>, res: Response): Promise<void> => {
  const result = await employeesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (
  req: AppRequest<GetEmployeeById>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const employee = await employeesService.getById(req.state!.params.id);

  if (!employee) {
    return next(new HttpError(404, 'Employee not found'));
  }

  res.status(200).json(employee);
};
