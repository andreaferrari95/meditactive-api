import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connessione al database riuscita.");

    app.listen(PORT, () => {
      console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Errore di connessione al DB:", err.message);
    process.exit(1);
  }
}

startServer();
