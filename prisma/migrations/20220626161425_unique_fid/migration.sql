/*
  Warnings:

  - A unique constraint covering the columns `[fId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_fId_key" ON "User"("fId");
