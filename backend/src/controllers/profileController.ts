import { Request, Response } from "express";
import {
  getUserPrivateProfileService,
  getUserPublicProfileService,
  updateFavoriteTeamService,
  markRulesAsReadService,
  changePasswordService
} from "../services/profileService";

export const getPrivateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    const profileData = await getUserPrivateProfileService(userId);
    res.status(200).json(profileData);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    // username viene de la URL — /profile/:username
    const username = req.params.username as string;

    const profileData = await getUserPublicProfileService(username);
    res.status(200).json(profileData);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const updateFavoriteTeam = async (req: Request, res: Response) => {
  try {
    const { favoriteTeam } = req.body;
    const userId = req.userId as string;

    const result = await updateFavoriteTeamService(userId, favoriteTeam);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const markRulesAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    const result = await markRulesAsReadService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const result = await changePasswordService(userId, currentPassword, newPassword);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};