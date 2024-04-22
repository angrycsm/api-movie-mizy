/*
  Warnings:

  - Added the required column `slug` to the `films` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category_films" ADD COLUMN "details" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_films" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "drive_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "films_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category_films" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_films" ("categoryId", "created_at", "details", "drive_url", "id", "image_url", "name") SELECT "categoryId", "created_at", "details", "drive_url", "id", "image_url", "name" FROM "films";
DROP TABLE "films";
ALTER TABLE "new_films" RENAME TO "films";
CREATE INDEX "film_name_index" ON "films"("name");
CREATE UNIQUE INDEX "films_name_drive_url_image_url_slug_key" ON "films"("name", "drive_url", "image_url", "slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
