import { Request, Response } from "express";
import {
  createMatchService,
  getMatchesService,
  updateMatchService,
} from "../services/matchService";

// Crear uno o varios partidos nuevos
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { matches } = req.body;

    const result = await createMatchService(matches);
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Obtener los partidos
export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getMatchesService();
    res.status(200).json(matches);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Actualizar un partido
export const updateMatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { homeScore, awayScore } = req.body;

    const result = await updateMatchService({ id, homeScore, awayScore });

    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
