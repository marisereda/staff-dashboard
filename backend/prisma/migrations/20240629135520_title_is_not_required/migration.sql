-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("content", "createdAt", "id", "isDone", "isImportant", "ownerId", "title", "updatedAt") SELECT "content", "createdAt", "id", "isDone", "isImportant", "ownerId", "title", "updatedAt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE UNIQUE INDEX "Note_ownerId_key" ON "Note"("ownerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
