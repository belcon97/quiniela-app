/*
  Warnings:

  - The `penaltyWinner` column on the `Prediction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usedWildcard` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `customName` on the `UserTopScorerPrediction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `TopScorer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `topScorerId` on table `UserTopScorerPrediction` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PenaltyWinner" AS ENUM ('home', 'away');

-- DropForeignKey
ALTER TABLE "UserTopScorerPrediction" DROP CONSTRAINT "UserTopScorerPrediction_topScorerId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "penaltyWinner",
ADD COLUMN     "penaltyWinner" "PenaltyWinner";

-- AlterTable
ALTER TABLE "TopScorer" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "usedWildcard",
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserTopScorerPrediction" DROP COLUMN "customName",
ALTER COLUMN "topScorerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TopScorer_name_key" ON "TopScorer"("name");

-- AddForeignKey
ALTER TABLE "UserTopScorerPrediction" ADD CONSTRAINT "UserTopScorerPrediction_topScorerId_fkey" FOREIGN KEY ("topScorerId") REFERENCES "TopScorer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
