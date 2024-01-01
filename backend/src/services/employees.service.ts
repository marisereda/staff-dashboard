import { EmployeesQuery } from "../schemas/employees-query.schema";
import { prisma } from "./prisma.service";

export const getAll = async (query: EmployeesQuery) => {
  return await prisma.employee.findMany();
};
