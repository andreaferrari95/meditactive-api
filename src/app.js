import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/users.js";
import intervalRoutes from "./routes/goalIntervals.js";
import goalRoutes from "./routes/goals.js";
import authRoutes from "./routes/auth.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Troppe richieste da questo IP, riprova più tardi.",
  })
);

app.use(express.json());

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRoutes);
app.use("/api/goal-intervals", intervalRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

export default app;
