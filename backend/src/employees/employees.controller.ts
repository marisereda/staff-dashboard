import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { employeesService } from './employees.service';
import { GetEmployeeByIdRequest, GetEmployeesRequest, UpdateEmployeeRequest } from './types';

export const getAll = async (
  req: AppRequest<GetEmployeesRequest>,
  res: Response
): Promise<void> => {
  const result = await employeesService.getAll(req.state!.query);
  res.status(200).json(result);
};

export const getById = async (
  req: AppRequest<GetEmployeeByIdRequest>,
  res: Response
): Promise<void> => {
  const employee = await employeesService.getById(req.state!.params.id);
  res.status(200).json(employee);
};

export const update = async (
  req: AppRequest<UpdateEmployeeRequest>,
  res: Response
): Promise<void> => {
  const employee = await employeesService.updateOne(req.state!.params.id, req.state!.body);
  res.status(200).json(employee);
};
