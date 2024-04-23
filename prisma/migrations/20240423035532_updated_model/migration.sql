/*
  Warnings:

  - Added the required column `slug` to the `movie_category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "details" TEXT
);
INSERT INTO "new_movie_category" ("details", "id", "name") SELECT "details", "id", "name" FROM "movie_category";
DROP TABLE "movie_category";
ALTER TABLE "new_movie_category" RENAME TO "movie_category";
CREATE UNIQUE INDEX "movie_category_name_slug_key" ON "movie_category"("name", "slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
