import { Prisma } from '@prisma/client';

export type StoreWithTotals = {
  rowNumber: bigint;
  id: string;
  address: string | null;
  checkoutNumber: number;
  total: bigint | null;
  fops: bigint | null;
};

export const getStoresWithTotalsSQL = (): Prisma.Sql => Prisma.sql`
SELECT
  ROW_NUMBER() OVER(ORDER BY s.addressHr ASC) AS rowNumber,
  s.id,
  s.addressHr as address,
  s.checkoutNumber,
  whr.total,
  whr.fops
FROM Store s
LEFT JOIN (
  SELECT
    whr.storeId,
    COUNT() as total,
    COUNT(CASE WHEN e.isFop THEN e.isFop END) as fops
  FROM WorkplaceHr whr
  LEFT JOIN Employee e ON whr.employeeId = e.id
  GROUP BY whr.storeId
  ) whr ON s.id = whr.storeId
;
`;
