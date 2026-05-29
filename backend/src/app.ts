import express from "express";
import cors from "cors";
import { requireAuth, requireAdmin } from "./middlewares/authMiddleware";

// Rutas publicas
import authRoutes from "./routes/auth";

// Rutas de usuario
import homeRoutes from "./routes/home";
import profileRoutes from "./routes/profile";
import rankingRoutes from "./routes/ranking";
import predictionRoutes from "./routes/predictions";
import topScorerRoutes from "./routes/topScorer";

// Rutas de admin
import adminRoutes from "./routes/admin/admin";

const app = express();

app.use(express.json());
app.use(cors());

// Publico
app.use("/auth", authRoutes);

// Usuario autenticado
app.use("/home", requireAuth, homeRoutes);
app.use("/profile", requireAuth, profileRoutes);
app.use("/ranking", requireAuth, rankingRoutes);
app.use("/predictions", requireAuth, predictionRoutes);
app.use("/top-scorers", requireAuth, topScorerRoutes);

// Solo admin
app.use("/admin", requireAdmin, adminRoutes);

export default app;