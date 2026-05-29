import { Router } from "express";
import matchRoutes from "./matches";
import topScorerRoutes from "./topScorers";
import userRoutes from "./users";

const router = Router();

router.use("/matches", matchRoutes);
router.use("/top-scorers", topScorerRoutes);
router.use("/users", userRoutes);

export default router;