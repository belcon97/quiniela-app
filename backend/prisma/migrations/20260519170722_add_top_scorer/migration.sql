-- CreateTable
CREATE TABLE "TopScorer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopScorer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTopScorerPrediction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topScorerId" TEXT,
    "customName" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTopScorerPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTopScorerPrediction_userId_key" ON "UserTopScorerPrediction"("userId");

-- AddForeignKey
ALTER TABLE "UserTopScorerPrediction" ADD CONSTRAINT "UserTopScorerPrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTopScorerPrediction" ADD CONSTRAINT "UserTopScorerPrediction_topScorerId_fkey" FOREIGN KEY ("topScorerId") REFERENCES "TopScorer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
