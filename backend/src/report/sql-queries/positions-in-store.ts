import { Prisma } from '@prisma/client';

export type PositionsInStore = {
  cashiers: bigint | null;
  salers: bigint | null;
  managers: bigint | null;
};

export const getPositionsInStoreSQL = ({
  storeId,
  cashiers,
  salers,
  managers,
}: {
  storeId: string;
  cashiers: string[];
  salers: string[];
  managers: string[];
}): Prisma.Sql => Prisma.sql`
SELECT
  COUNT(CASE WHEN whr.position IN (${Prisma.join(cashiers)}) THEN whr.position END) as cashiers,
  COUNT(CASE WHEN whr.position IN (${Prisma.join(salers)}) THEN whr.position END) as salers,
  COUNT(CASE WHEN whr.position IN (${Prisma.join(managers)}) THEN whr.position END) as managers
FROM WorkplaceHr whr
WHERE whr.storeId = ${storeId}
AND whr.employeeId IN (
  SELECT
    employeeId FROM WorkplaceBuh
    WHERE storeId = ${storeId}
  )
GROUP BY whr.storeId
;
`;
