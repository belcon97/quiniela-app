import { Router } from "express";
import {
  createPrediction,
  getPredictionsId,
  getPublicPredictions,
} from "../controllers/predictionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createPrediction);
router.get("/me", authMiddleware, getPredictionsId);

router.get("/:userId", getPublicPredictions);

export default router;
