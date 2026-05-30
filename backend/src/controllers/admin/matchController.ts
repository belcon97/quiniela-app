import { Request, Response } from "express";
import {
  createMatchService,
  getMatchesService,
  updateMatchService,
  updateMatchScoreService,
  deleteMatchService,
} from "../../services/admin/matchService";

// Crear uno o varios partidos
export const createMatch = async (req: Request, res: Response) => {
  try {
    // Validar que llegue el array de partidos
    const { matches } = req.body;
    if (!matches || !Array.isArray(matches) || matches.length === 0) {
      return res.status(400).json({ message: "Formato inválido" });
    }

    const result = await createMatchService(matches);
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Listar todos los partidos
export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getMatchesService();
    res.status(200).json(matches);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Editar datos de un partido
export const updateMatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { homeTeam, awayTeam, homeFlag, awayFlag, group, stadium, date } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const result = await updateMatchService(id, {
      homeTeam,
      awayTeam,
      homeFlag,
      awayFlag,
      group,
      stadium,
      date,
    });
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Cargar resultado de un partido
export const updateMatchScore = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { homeScore, awayScore, penaltyWinner } = req.body;

    if (!id || homeScore === undefined || awayScore === undefined) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const result = await updateMatchScoreService(id, {
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      penaltyWinner,
    });
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Eliminar un partido
export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const result = await deleteMatchService(id);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
