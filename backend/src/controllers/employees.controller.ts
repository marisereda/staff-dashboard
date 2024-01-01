import { Response } from "express";
import * as employeesService from "../services/employees.service";
import { AppRequest } from "../types/app.types";

export const getEmployees = async (req: AppRequest, res: Response) => {
  const employees = await employeesService.getAll(req.state.query);
  res.status(200).json(employees);
};
