const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/users");
const intervalRoutes = require("./routes/goalIntervals");
const goalRoutes = require("./routes/goals");

app.use("/api/users", userRoutes);
app.use("/api/goal-intervals", intervalRoutes);
app.use("/api/goals", goalRoutes);
app.use("/uploads", express.static("uploads"));

module.exports = app;
