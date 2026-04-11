import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import matchRoutes from "./routes/matches";
import predictionRoutes from "./routes/predictions";
import homeRoutes from "./routes/home";
import profileRoutes from "./routes/profile";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// public routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/predictions", predictionRoutes);
app.use("/profile", profileRoutes);

// private routes
app.use("/matches", matchRoutes);

export default app;
