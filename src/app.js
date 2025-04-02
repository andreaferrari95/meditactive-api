const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Per i file
app.use("/api/users", userRoutes); // User route

module.exports = app;
