/*
  Warnings:

  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `duration` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favorites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackId` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_userId_fkey";

-- DropIndex
DROP INDEX "Favorites_name_key";

-- DropIndex
DROP INDEX "Favorites_userId_key";

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
DROP COLUMN "duration",
DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_trackId_key" ON "Favorites"("trackId");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
