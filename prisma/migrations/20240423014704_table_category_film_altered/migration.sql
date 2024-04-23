/*
  Warnings:

  - You are about to drop the `category_films` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `films` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "category_films";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "films";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "movie_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT
);

-- CreateTable
CREATE TABLE "movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "drive_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "movies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "movie_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_category_name_key" ON "movie_category"("name");

-- CreateIndex
CREATE INDEX "film_name_index" ON "movies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movies_name_drive_url_image_url_slug_key" ON "movies"("name", "drive_url", "image_url", "slug");
