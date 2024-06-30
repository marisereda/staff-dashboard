import { Response } from 'express';
import { AppRequest } from '~/common/types';
import { employeesService } from './employees.service';
import {
  DeleteWorkplaceRequest,
  GetEmployeeRequest,
  GetEmployeesRequest,
  UpdateEmployeeRequest,
} from './types';

export const getAll = async (
  req: AppRequest<GetEmployeesRequest>,
  res: Response
): Promise<void> => {
  const employeesPage = await employeesService.getAll(req.state!.query);
  res.status(200).json(employeesPage);
};

export const getOne = async (req: AppRequest<GetEmployeeRequest>, res: Response): Promise<void> => {
  const employee = await employeesService.getOne(req.state!.params.id);
  res.status(200).json(employee);
};

export const updateOne = async (
  req: AppRequest<UpdateEmployeeRequest>,
  res: Response
): Promise<void> => {
  const employee = await employeesService.updateOne(req.state!.params.id, req.state!.body);
  res.status(200).json(employee);
};

export const deleteOne = async (
  req: AppRequest<GetEmployeeRequest>,
  res: Response
): Promise<void> => {
  const employee = await employeesService.deleteOne(req.state!.params.id);
  res.status(200).json(employee);
};

export const deleteBuhWorkplace = async (
  req: AppRequest<DeleteWorkplaceRequest>,
  res: Response
): Promise<void> => {
  await employeesService.deleteBuhWorkplace(req.state!.params.workplaceId);
  res.status(204).end();
};
