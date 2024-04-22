/*
  Warnings:

  - You are about to drop the `_EmployerToStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `employerId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `newPosition` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `newStoreId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `positionBuh` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `storeAddressBuh` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `storeAddressesBuh` on the `Employer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_EmployerToStore_B_index";

-- DropIndex
DROP INDEX "_EmployerToStore_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EmployerToStore";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Workplace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "newStoreId" TEXT,
    "positionHr" TEXT NOT NULL,
    "newPositionHr" TEXT,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Workplace_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Workplace_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Workplace_newStoreId_fkey" FOREIGN KEY ("newStoreId") REFERENCES "Store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkplaceBuh" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "positionBuh" TEXT NOT NULL,
    "addressBuh" TEXT NOT NULL,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WorkplaceBuh_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkplaceBuh_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code1C" TEXT,
    "inn" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "isFop" BOOLEAN DEFAULT false,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Employee" ("code1C", "createdAt", "id", "inn", "isFop", "markDelete", "name", "phone", "updatedAt") SELECT "code1C", "createdAt", "id", "inn", "isFop", "markDelete", "name", "phone", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_Employer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSingleTax" BOOLEAN DEFAULT false,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Employer" ("createdAt", "id", "inn", "isSingleTax", "markDelete", "name", "updatedAt") SELECT "createdAt", "id", "inn", "isSingleTax", "markDelete", "name", "updatedAt" FROM "Employer";
DROP TABLE "Employer";
ALTER TABLE "new_Employer" RENAME TO "Employer";
CREATE UNIQUE INDEX "Employer_inn_key" ON "Employer"("inn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
