import { Request, Response } from "express";
import {
  getMatchesService,
  getMatchPredictionsService,
} from "../services/matchService";

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getMatchesService();
    res.status(200).json(matches);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getMatchPredictions = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.userId as string;
    const result = await getMatchPredictionsService(id, userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};