import { Prisma } from '@prisma/client';

export type EmployedInStore = {
  employerId: string | null;
  employees: bigint | null;
};

export const getEmployedInStoreSQL = (storeId: string): Prisma.Sql => Prisma.sql`
SELECT
  CASE WHEN e.isSingleTax THEN NULL ELSE e.id END as employerId,
  COUNT() as employees
FROM WorkplaceBuh wbuh
LEFT JOIN Employer e ON wbuh.employerId = e.id
WHERE wbuh.storeId = ${storeId}
AND wbuh.employeeId IN (
  SELECT
    employeeId FROM WorkplaceHr whr
    WHERE storeId = ${storeId}
  )
GROUP BY CASE WHEN e.isSingleTax THEN NULL ELSE wbuh.employerId END
;
`;
