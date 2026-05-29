import { Request, Response } from "express";
import {
  getTopScorersService,
  createTopScorerPredictionService,
  getMyTopScorerPredictionService,
} from "../services/topScorerService";

// Ver lista de candidatos activos
export const getTopScorers = async (res: Response) => {
  try {
    const result = await getTopScorersService();
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Elegir goleador
export const createTopScorerPrediction = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.userId as string;
    const { topScorerId } = req.body;

    if (!topScorerId) {
      return res.status(400).json({ message: "El goleador es obligatorio" });
    }

    const result = await createTopScorerPredictionService({
      userId,
      topScorerId,
    });
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Ver mi predicción de goleador
export const getMyTopScorerPrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const result = await getMyTopScorerPredictionService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
