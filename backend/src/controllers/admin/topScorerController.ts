import { Request, Response } from "express";
import {
  createTopScorerService,
  updateTopScorerGoalsService,
  closeTopScorerSelectionService,
  openTopScorerSelectionService,
  closeTopScorerService,
  deleteTopScorerService,
} from "../../services/admin/topScorerService";

// Crear candidato
export const createTopScorer = async (req: Request, res: Response) => {
  try {
    const { name, team, flag } = req.body;
    if (!name || !team || !flag) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const result = await createTopScorerService({ name, team, flag });
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Actualizar goles de un candidato
export const updateTopScorerGoals = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { goals } = req.body;

    if (goals === undefined) {
      return res.status(400).json({ message: "Los goles son obligatorios" });
    }

    const result = await updateTopScorerGoalsService(id, goals);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Cerrar periodo de selección
export const closeTopScorerSelection = async (res: Response) => {
  try {
    const result = await closeTopScorerSelectionService();
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Abrir periodo de selección
export const openTopScorerSelection = async (res: Response) => {
  try {
    const result = await openTopScorerSelectionService();
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Cerrar torneo y asignar puntos
export const closeTopScorer = async (req: Request, res: Response) => {
  try {
    const result = await closeTopScorerService();
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Eliminar candidato
export const deleteTopScorer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await deleteTopScorerService(id);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
