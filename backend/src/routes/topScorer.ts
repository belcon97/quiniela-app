import { Router } from "express";
import {
  getTopScorers,
  createTopScorerPrediction,
  getMyTopScorerPrediction,
} from "../controllers/topScorerController";

const router = Router();

router.get("/", getTopScorers);
router.post("/predict", createTopScorerPrediction);
router.get("/my-prediction", getMyTopScorerPrediction);

export default router;