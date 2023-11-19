/*
  Warnings:

  - You are about to drop the column `userId` on the `Item` table. All the data in the column will be lost.

*/
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
    "sellerId" TEXT NOT NULL
);
INSERT INTO "new_Item" ("author", "category", "creationDate", "description", "id", "periodicity", "price", "sellerId", "status", "title") SELECT "author", "category", "creationDate", "description", "id", "periodicity", "price", "sellerId", "status", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
