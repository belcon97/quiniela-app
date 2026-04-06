import { Request, Response } from "express";
import { getRankingService } from "../services/rankingService";

export const getRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await getRankingService();
    res.status(200).json(ranking);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
