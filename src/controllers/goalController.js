const goalModel = require("../models/goalModel");

module.exports = {
  async getAllGoals(req, res) {
    try {
      const goals = await goalModel.getAllGoals();
      res.json(goals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore nel recupero degli obiettivi." });
    }
  },

  async getGoalById(req, res) {
    try {
      const goal = await goalModel.getGoalById(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: "Obiettivo non trovato." });
      }
      res.json(goal);
    } catch (err) {
      res.status(500).json({ message: "Errore nel recupero dell'obiettivo." });
    }
  },

  async createGoal(req, res) {
    const { title, description, type } = req.body;

    if (!title || !type) {
      return res
        .status(400)
        .json({ message: "Titolo e tipo sono obbligatori." });
    }

    try {
      const id = await goalModel.createGoal(title, description, type);
      res.status(201).json({ id, title, description, type });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore durante la creazione dell'obiettivo." });
    }
  },

  async updateGoal(req, res) {
    const { title, description, type } = req.body;

    try {
      const goal = await goalModel.getGoalById(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: "Obiettivo non trovato." });
      }

      await goalModel.updateGoal(req.params.id, title, description, type);
      res.json({ message: "Obiettivo aggiornato." });
    } catch (err) {
      res.status(500).json({ message: "Errore durante l'aggiornamento." });
    }
  },

  async deleteGoal(req, res) {
    try {
      const goal = await goalModel.getGoalById(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: "Obiettivo non trovato." });
      }

      await goalModel.deleteGoal(req.params.id);
      res.json({ message: "Obiettivo eliminato." });
    } catch (err) {
      res.status(500).json({ message: "Errore durante l'eliminazione." });
    }
  },
};
