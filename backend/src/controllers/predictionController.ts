import { Request, Response } from "express";
import {
  createPredictionService,
  getUserPredictionsService,
} from "../services/predictionService";

// Crear predicciones
export const createPrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const { predictions } = req.body;

    // Validacion de input — que llegue el array de predicciones
    if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
      return res.status(400).json({ message: "Debe enviar al menos una prediccion" });
    }

    const result = await createPredictionService(userId, predictions);
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Ver mis predicciones
export const getMyPredictions = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;
    const result = await getUserPredictionsService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Ver predicciones de otro usuario
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