import { Response } from 'express';
import { AppRequest } from '~/types';
import { GetEmployeeById, GetEmployees } from './employees.schema';
import { employeesService } from './employees.service';

export const getAll = async (req: AppRequest<GetEmployees>, res: Response): Promise<void> => {
  const result = await employeesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (req: AppRequest<GetEmployeeById>, res: Response): Promise<void> => {
  const employee = await employeesService.getById(req.state!.params.id);
  res.status(200).json(employee);
};
