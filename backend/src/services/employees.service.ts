import { EmployeesQuery } from "../schemas/employees-query.schema";
import { prisma } from "./prisma.service";

export const getAll = async ({
  q,
  isFop,
  employerId,
  storeId,
  sortBy,
  sortOrder,
  page,
  pageSize,
}: EmployeesQuery) => {
  let where = {};
  const orderBy = { [sortBy]: sortOrder };
  const skip = pageSize * (page - 1);
  const take = pageSize;

  if (q) {
    const conditions = ["inn", "name", "phone", "position"].map(item => ({
      [item]: { contains: q },
    }));
    where = { ...where, OR: conditions };
  }
  where = { ...where, isFop, employerId, storeId };

  const data = await prisma.employee.findMany({ where, orderBy, skip, take });
  const total = await prisma.employee.count({ where });

  return { data, page, pageSize, total };
};
