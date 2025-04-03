import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e password sono obbligatorie." });
    }

    try {
      const user = await userModel.getByEmail(email);
      console.log("🔍 Utente trovato:", user); // 👈 AGGIUNGI QUI

      if (!user) {
        return res.status(401).json({ message: "Credenziali non valide." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenziali non valide." });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore durante il login." });
    }
  },
};

export default authController;
