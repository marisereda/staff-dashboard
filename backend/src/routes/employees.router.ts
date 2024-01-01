import { Router } from "express";
import * as employeesController from "../controllers/employees.controller";
import { validateQuery } from "../middlewares/validate-query";
import { EmployeesQuerySchema } from "../schemas/employees-query.schema";

export const employeesRouter = Router();

employeesRouter.get("/", validateQuery(EmployeesQuerySchema), employeesController.getAll);
employeesRouter.get("/:id", () => {});
employeesRouter.get("/:id/changes", () => {});
