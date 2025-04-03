import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

const userController = {
  async createUser(req, res) {
    const { name, surname, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userModel.createUser(
        name,
        surname,
        email,
        hashedPassword
      );
      res.status(201).json({ id: userId, name, surname, email });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore durante la creazione dell'utente." });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Errore nel recupero degli utenti." });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Utente non trovato." });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Errore nel recupero dell'utente." });
    }
  },

  async updateUser(req, res) {
    const { name, surname, email } = req.body;
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Utente non trovato." });

      await userModel.updateUser(req.params.id, name, surname, email);
      res.json({ message: "Utente aggiornato." });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Errore nell'aggiornamento dell'utente." });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Utente non trovato." });

      await userModel.deleteUser(req.params.id);
      res.json({ message: "Utente eliminato." });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Errore nella cancellazione dell'utente." });
    }
  },
};

export default userController;
