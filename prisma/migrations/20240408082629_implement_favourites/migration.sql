-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "fav" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "fav" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "fav" BOOLEAN NOT NULL DEFAULT false;
