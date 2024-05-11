/*
  Warnings:

  - You are about to drop the column `updateStatus` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code1C" TEXT,
    "inn" TEXT,
    "isFop" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "updateStatusHr" TEXT,
    "updateStatusBuh" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Employee" ("code1C", "createdAt", "id", "inn", "isFop", "name", "phone", "updatedAt") SELECT "code1C", "createdAt", "id", "inn", "isFop", "name", "phone", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_code1C_key" ON "Employee"("code1C");
CREATE UNIQUE INDEX "Employee_inn_key" ON "Employee"("inn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
