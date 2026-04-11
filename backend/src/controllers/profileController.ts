import { Request, Response } from "express";
import {
  getUserPrivateProfileService,
  getUserPublicProfileService,
} from "../services/profileService";

export const getPrivateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;

    const profileData = await getUserPrivateProfileService(userId);
    res.status(200).json(profileData);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const username = req.params.username as string;

    const profileData = await getUserPublicProfileService(username);
    res.status(200).json(profileData);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
