-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteTeam" TEXT,
ADD COLUMN     "hasReadRules" BOOLEAN NOT NULL DEFAULT false;
