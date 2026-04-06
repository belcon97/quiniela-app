import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import matchRoutes from "./routes/matches";
import predictionRoutes from "./routes/predictions";
import rankingRoutes from "./routes/ranking";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRoutes);
app.use("/matches", matchRoutes);
app.use("/predictions", predictionRoutes);
app.use("/ranking", rankingRoutes);

export default app;
