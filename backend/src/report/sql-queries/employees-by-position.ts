import { Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

export type EmployeesByPosition = {
  storeId: string | null;
  employedCount: bigint;
};

export const employeesByPositionQuery = (positions: string[]): Sql => Prisma.sql`
  SELECT
    storeId,
  SUM(CASE WHEN (employerId IS NOT NULL) AND ("position" IN (${Prisma.join(
    positions
  )})) THEN 1 ELSE 0 END) as employedCount
  FROM Employee
  GROUP BY  storeId
;
`;
