import { Router } from "express";
import { getEmployees } from "../controllers/employees.controller";
import { validateQuery } from "../middlewares/validate-query";
import { EmployeesQuerySchema } from "../schemas/employees-query.schema";

export const employeesRouter = Router();

employeesRouter.get("/", validateQuery(EmployeesQuerySchema), getEmployees);
employeesRouter.get("/:id", () => {});
employeesRouter.get("/:id/changes", () => {});
