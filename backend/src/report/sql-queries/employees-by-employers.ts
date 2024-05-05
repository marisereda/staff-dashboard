import { Prisma } from '@prisma/client';

export type EmployeesByEmployers = {
  storeId: string;
  employerId: string;
  employedCount: bigint;
};

export const employeesByEmployersQuery = Prisma.sql`
  SELECT
    storeId,
    employerId,
    COUNT(employerId) as employedCount
  FROM Employee
    FULL JOIN Store ON Employee.storeId = Store.id
    FULL JOIN Employer ON Employee.employerId = Employer.id
  GROUP BY storeId, employerId
  ;
`;
