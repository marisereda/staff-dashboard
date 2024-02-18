-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code1C" TEXT,
    "inn" TEXT,
    "name" TEXT NOT NULL,
    "isFop" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "position" TEXT,
    "newPosition" TEXT,
    "positionBuh" TEXT,
    "storeAddreessBuh" TEXT,
    "storeId" TEXT,
    "newStoreId" TEXT,
    "employerId" TEXT,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("code1C", "createdAt", "employerId", "id", "inn", "isFop", "markDelete", "name", "newPosition", "newStoreId", "phone", "position", "positionBuh", "storeAddreessBuh", "storeId", "updatedAt") SELECT "code1C", "createdAt", "employerId", "id", "inn", "isFop", "markDelete", "name", "newPosition", "newStoreId", "phone", "position", "positionBuh", "storeAddreessBuh", "storeId", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
