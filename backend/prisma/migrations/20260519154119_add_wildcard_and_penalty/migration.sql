-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "usedWildcard" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "isWildcard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "penaltyWinner" TEXT;
