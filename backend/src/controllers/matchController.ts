import { Request, Response } from "express";
import { getMatchesService } from "../services/matchService";

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getMatchesService();
    res.status(200).json(matches);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};