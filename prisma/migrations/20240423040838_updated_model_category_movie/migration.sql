/*
  Warnings:

  - The primary key for the `movie_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `movie_category` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `movie_category` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `categoryId` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT
);
INSERT INTO "new_movie_category" ("details", "id", "name") SELECT "details", "id", "name" FROM "movie_category";
DROP TABLE "movie_category";
ALTER TABLE "new_movie_category" RENAME TO "movie_category";
CREATE UNIQUE INDEX "movie_category_name_key" ON "movie_category"("name");
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "drive_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "movies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "movie_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movies" ("categoryId", "created_at", "details", "drive_url", "id", "image_url", "name", "slug") SELECT "categoryId", "created_at", "details", "drive_url", "id", "image_url", "name", "slug" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE UNIQUE INDEX "movies_drive_url_key" ON "movies"("drive_url");
CREATE UNIQUE INDEX "movies_image_url_key" ON "movies"("image_url");
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");
CREATE INDEX "film_name_index" ON "movies"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
