import { Request, Response } from "express";
import { getHomeService } from "../services/homeService";

export const getHome = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;

    const homeData = await getHomeService(userId);
    res.status(200).json(homeData);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
