import { Request, Response } from "express";
import {
  createPredictionService,
  getUserPredictionsService,
} from "../services/predictionService";

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const { predictions } = req.body;

    const result = await createPredictionService(userId, predictions);
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getPredictionsId = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const result = await getUserPredictionsService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getPublicPredictions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const result = await getUserPredictionsService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
