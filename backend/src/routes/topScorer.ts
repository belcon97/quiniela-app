import { Router } from "express";
import {
  getTopScorers,
  createTopScorer,
  updateTopScorerGoals,
  closeTopScorer,
  createTopScorerPrediction,
  getMyTopScorerPrediction,
} from "../controllers/topScorerController";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getTopScorers);
router.post("/", authMiddleware, isAdmin, createTopScorer);
router.patch("/:id/goals", authMiddleware, isAdmin, updateTopScorerGoals);
router.post("/close", authMiddleware, isAdmin, closeTopScorer);
router.post("/predict", authMiddleware, createTopScorerPrediction);
router.get("/my-prediction", authMiddleware, getMyTopScorerPrediction);

export default router;
