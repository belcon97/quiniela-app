/*
  Warnings:

  - The `status` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,matchId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('pending', 'completed');

-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_userId_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(), -- ✅
DROP COLUMN "status",
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_userId_matchId_key" ON "Prediction"("userId", "matchId");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;