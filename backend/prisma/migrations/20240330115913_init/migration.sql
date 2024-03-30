-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code1C" TEXT,
    "inn" TEXT,
    "name" TEXT NOT NULL,
    "isFop" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "position" TEXT,
    "newPosition" TEXT,
    "positionBuh" TEXT,
    "storeAddressBuh" TEXT,
    "storeId" TEXT,
    "newStoreId" TEXT,
    "employerId" TEXT,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSingleTax" BOOLEAN DEFAULT false,
    "storeAddressesBuh" TEXT,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code1C" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "checkoutNumber" INTEGER,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "isDone" BOOLEAN,
    "isImportant" BOOLEAN,
    "markDelete" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Employer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EmployerToStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EmployerToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Employer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployerToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Employer_inn_key" ON "Employer"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "Store_code1C_key" ON "Store"("code1C");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployerToStore_AB_unique" ON "_EmployerToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployerToStore_B_index" ON "_EmployerToStore"("B");
