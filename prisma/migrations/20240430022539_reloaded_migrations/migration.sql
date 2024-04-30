/*
  Warnings:

  - The primary key for the `movie_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `movies` table. All the data in the column will be lost.
  - Added the required column `emailCreatedCategory` to the `movie_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailCreatedMovieInCategory` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "emailCreatedCategory" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "movie_category_emailCreatedCategory_fkey" FOREIGN KEY ("emailCreatedCategory") REFERENCES "user" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "category_id" TEXT NOT NULL,
    "emailCreatedMovieInCategory" TEXT NOT NULL,
    CONSTRAINT "movies_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "movie_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "movies_emailCreatedMovieInCategory_fkey" FOREIGN KEY ("emailCreatedMovieInCategory") REFERENCES "user" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movies" ("created_at", "details", "drive_url", "id", "image_url", "name", "slug") SELECT "created_at", "details", "drive_url", "id", "image_url", "name", "slug" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");
CREATE UNIQUE INDEX "movies_category_id_name_drive_url_image_url_key" ON "movies"("category_id", "name", "drive_url", "image_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
