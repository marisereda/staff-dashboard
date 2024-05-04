-- CreateTable
CREATE TABLE "_EmployerToStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EmployerToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Employer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployerToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployerToStore_AB_unique" ON "_EmployerToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployerToStore_B_index" ON "_EmployerToStore"("B");
