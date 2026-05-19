/*
  Warnings:

  - You are about to drop the column `usedWildcard` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "usedWildcard";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "usedWildcard" BOOLEAN NOT NULL DEFAULT false;
