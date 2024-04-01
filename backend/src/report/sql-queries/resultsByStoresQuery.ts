import { Prisma } from '@prisma/client';

export type ResultsByStore = {
  storeId: string;
  rowNumber: bigint;
  storeAddress: string;
  totalCount: bigint;
  sumEmployees: bigint;
  fopCount: bigint;
  employedCount: bigint;
  storeCheckoutNumber: bigint;
};

export const resultsByStoresSQLQuery = Prisma.sql`
SELECT
  storeId,
  ROW_NUMBER() OVER(ORDER BY Store.address ASC) as rowNumber,
  Store.address as storeAddress,
  Store.checkoutNumber as storeCheckoutNumber,
  COUNT(*) as totalCount,
  SUM(isFop) + COUNT(employerId) as sumEmployees,
  SUM(isFop) as fopCount,
  COUNT(employerId) as employedCount
FROM Employee
  FULL JOIN Store ON Employee.storeId = Store.id
  FULL JOIN Employer ON Employee.employerId = Employer.id
GROUP BY storeId
ORDER BY Store.address ASC
;
`;
