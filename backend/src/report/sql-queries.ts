import { Prisma } from '@prisma/client';

export const totalsSQL = Prisma.sql`
  SELECT
    storeId,
    ROW_NUMBER() OVER(ORDER BY Store.address ASC) as rowNumber,
    Store.address as storeAddress,
    COUNT(*) as totalCount,
    SUM(isFop) as fopCount,
    COUNT(employerId) as employedCount
  FROM Employee
    FULL JOIN Store ON Employee.storeId = Store.id
    FULL JOIN Employer ON Employee.employerId = Employer.id
  GROUP BY storeId
  ORDER BY Store.address ASC
  ;
`;

export const detailsSQL = Prisma.sql`
  SELECT
    storeId,
    employerId ,
    COUNT(employerId) as employedCount
  FROM Employee
    FULL JOIN Store ON Employee.storeId = Store.id
    FULL JOIN Employer ON Employee.employerId = Employer.id
  GROUP BY  storeId, employerId
  ;
`;
