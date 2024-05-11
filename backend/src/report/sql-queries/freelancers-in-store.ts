import { Prisma } from '@prisma/client';

export type FreelancersInStore = {
  employeeInn: string | null;
  employeeName: string | null;
  positionHr: string | null;
  positionBuh: string | null;
  employerName: string | null;
  addressBuh: string | null;
};

export const getFreelancersInStoreSQL = (storeId: string): Prisma.Sql => Prisma.sql`
SELECT
ee.inn as employeeInn, ee.name as employeeName, wh."position" as positionHr, wb."position" as positionBuh, er.name as employerName, st.addressBuh
FROM WorkplaceBuh wb
LEFT JOIN Employee ee ON wb.employeeId = ee.id
LEFT JOIN Employer er ON wb.employerId = er.id
LEFT JOIN Store st ON wb.storeId = st.id
LEFT JOIN WorkplaceHr wh ON wh.employeeId = ee.id
WHERE wb.storeId = ${storeId}
AND wb.employeeId NOT IN
	(SELECT employeeId FROM WorkplaceHr
		WHERE storeId = ${storeId})
;
`;
