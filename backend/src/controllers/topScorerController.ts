import { Request, Response } from "express";
import {
  getTopScorersService,
  createTopScorerService,
  updateTopScorerGoalsService,
  closeTopScorerService,
  createTopScorerPredictionService,
  getMyTopScorerPredictionService,
} from "../services/topScorerService";

export const getTopScorers = async (req: Request, res: Response) => {
  try {
    const result = await getTopScorersService();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const createTopScorer = async (req: Request, res: Response) => {
  try {
    const { name, team, flag } = req.body;
    const result = await createTopScorerService({ name, team, flag });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateTopScorerGoals = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { goals } = req.body;
    const result = await updateTopScorerGoalsService({ id, goals });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const closeTopScorer = async (req: Request, res: Response) => {
  try {
    const result = await closeTopScorerService();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const createTopScorerPrediction = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as any).userId as string;
    const { topScorerId, customName } = req.body;
    const result = await createTopScorerPredictionService({
      userId,
      topScorerId,
      customName,
    });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getMyTopScorerPrediction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const result = await getMyTopScorerPredictionService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
