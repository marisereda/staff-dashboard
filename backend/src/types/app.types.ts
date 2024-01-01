import { Request } from "express";
import { EmployeesQuery } from "../schemas/employees-query.schema";

export type AppRequest = Request & {
  state?: {
    query?: EmployeesQuery;
  };
};
