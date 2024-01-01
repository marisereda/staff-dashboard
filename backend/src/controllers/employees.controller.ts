import { Response } from "express";
import * as employeesService from "../services/employees.service";
import { AppRequest } from "../types/app.types";

export const getAll = async (req: AppRequest, res: Response) => {
  try {
    const employees = await employeesService.getAll(req.state.query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
