require("dotenv").config();
const app = require("./src/app");
const db = require("./config/db");

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test connessione DB
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
