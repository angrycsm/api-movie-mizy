-- CreateTable
CREATE TABLE "category_films" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "films" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "drive_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "films_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category_films" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "category_films_name_key" ON "category_films"("name");

-- CreateIndex
CREATE UNIQUE INDEX "films_name_key" ON "films"("name");

-- CreateIndex
CREATE UNIQUE INDEX "films_drive_url_key" ON "films"("drive_url");

-- CreateIndex
CREATE UNIQUE INDEX "films_image_url_key" ON "films"("image_url");

-- CreateIndex
CREATE INDEX "film_name_index" ON "films"("name");
