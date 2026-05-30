import { Router } from "express";
import {
  getTopScorers,
  createTopScorer,
  updateTopScorerGoals,
  closeTopScorerSelection,
  openTopScorerSelection,
  closeTopScorer,
  deleteTopScorer,
} from "../../controllers/admin/topScorerController";

const router = Router();

router.get("/", getTopScorers);
router.post("/", createTopScorer);
router.patch("/:id/goals", updateTopScorerGoals);
router.patch("/selection/close", closeTopScorerSelection);
router.patch("/selection/open", openTopScorerSelection);
router.post("/close", closeTopScorer);
router.delete("/:id", deleteTopScorer);

export default router;