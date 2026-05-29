import { Router } from "express";
import {
  createPrediction,
  getMyPredictions,
  getPublicPredictions,
} from "../controllers/predictionController";

const router = Router();

router.post("/", createPrediction);
router.get("/me", getMyPredictions);
router.get("/:userId", getPublicPredictions);

export default router;