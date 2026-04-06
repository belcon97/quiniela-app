import { Router } from "express";
import { getRanking } from "../controllers/rankingController";

const router = Router();

router.get("/", getRanking);

export default router;
