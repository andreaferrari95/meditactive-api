import intervalGoalModel from "../models/intervalGoalModel.js";

const intervalGoalController = {
  async addGoalToInterval(req, res) {
    const { goal_id } = req.body;
    const intervalId = req.params.id;

    if (!goal_id) {
      return res.status(400).json({ message: "goal_id è obbligatorio." });
    }

    try {
      await intervalGoalModel.associateGoalToInterval(intervalId, goal_id);
      res.status(201).json({ message: "Obiettivo associato all'intervallo." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore durante l'associazione." });
    }
  },

  async getGoalsByInterval(req, res) {
    try {
      const goals = await intervalGoalModel.getGoalsByInterval(req.params.id);
      res.json(goals);
    } catch (err) {
      res.status(500).json({
        message: "Errore nel recupero degli obiettivi per intervallo.",
      });
    }
  },
};

export default intervalGoalController;
