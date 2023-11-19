-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,
    "transactionValue" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,
    "periodicity" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("author", "category", "creationDate", "description", "id", "periodicity", "price", "sellerId", "status", "title") SELECT "author", "category", "creationDate", "description", "id", "periodicity", "price", "sellerId", "status", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
