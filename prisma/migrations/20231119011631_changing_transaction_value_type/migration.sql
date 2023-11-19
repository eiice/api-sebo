/*
  Warnings:

  - You are about to alter the column `transactionValue` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,
    "transactionValue" INTEGER NOT NULL
);
INSERT INTO "new_Transaction" ("buyerId", "creationDate", "id", "itemId", "sellerId", "transactionValue") SELECT "buyerId", "creationDate", "id", "itemId", "sellerId", "transactionValue" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
