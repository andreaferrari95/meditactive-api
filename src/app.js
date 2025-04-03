import express from "express";

import userRoutes from "./routes/users.js";
import intervalRoutes from "./routes/goalIntervals.js";
import goalRoutes from "./routes/goals.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/goal-intervals", intervalRoutes);
app.use("/api/goals", goalRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

export default app;
