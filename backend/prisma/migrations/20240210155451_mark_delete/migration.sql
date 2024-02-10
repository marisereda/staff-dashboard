/*
  Warnings:

  - A unique constraint covering the columns `[code1C]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inn]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inn]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code1C]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "markDelete" BOOLEAN DEFAULT false;
ALTER TABLE "Employee" ADD COLUMN "newPosition" TEXT;
ALTER TABLE "Employee" ADD COLUMN "newStoreId" TEXT;

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN "markDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN "markDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN "markDelete" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_code1C_key" ON "Employee"("code1C");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_inn_key" ON "Employee"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_inn_key" ON "Employer"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Store_code1C_key" ON "Store"("code1C");
