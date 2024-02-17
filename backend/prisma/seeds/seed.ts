import { PrismaClient } from '@prisma/client';
import { employees } from './employees';
import { employers } from './employers';
import { stores } from './stores';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.employee.deleteMany();
  await prisma.store.deleteMany();
  await prisma.employer.deleteMany();

  const newEmployeesPromises = employees.map(
    async employee => await prisma.employee.create({ data: employee })
  );
  const newEmployees = await Promise.all(newEmployeesPromises);
  const newEmployeesId = newEmployees.map(({ id }) => ({ id }));

  const newStoresPromises = stores.map(async store => await prisma.store.create({ data: store }));
  const newStores = await Promise.all(newStoresPromises);
  await prisma.store.update({
    where: { id: newStores[0]!.id },
    data: { employees: { connect: newEmployeesId } },
  });

  const newEmployersPromises = employers.map(
    async employer => await prisma.employer.create({ data: employer })
  );
  const newEmployers = await Promise.all(newEmployersPromises);
  await prisma.employer.update({
    where: { id: newEmployers[0]!.id },
    data: { employees: { connect: newEmployeesId } },
  });
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prisma.$disconnect();
//     throw e;
//   });
