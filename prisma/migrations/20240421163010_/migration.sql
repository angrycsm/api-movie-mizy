/*
  Warnings:

  - A unique constraint covering the columns `[name,drive_url,image_url]` on the table `films` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "films_name_drive_url_image_url_key" ON "films"("name", "drive_url", "image_url");
