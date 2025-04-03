import goalIntervalModel from "../models/goalIntervalModel.js";

const goalIntervalController = {
  async createInterval(req, res) {
    const { user_id, start_date, end_date } = req.body;

    if (!user_id || !start_date || !end_date) {
      return res
        .status(400)
        .json({ message: "Tutti i campi sono obbligatori." });
    }

    try {
      const id = await goalIntervalModel.createInterval(
        user_id,
        start_date,
        end_date
      );
      res.status(201).json({ id, user_id, start_date, end_date });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore nella creazione dell'intervallo." });
    }
  },

  async getAllIntervals(req, res) {
    try {
      const filters = {
        startDate: req.query.start_date,
        endDate: req.query.end_date,
        goalId: req.query.goal_id,
      };

      const intervals = await goalIntervalModel.getAllIntervals(filters);
      res.json(intervals);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore nel recupero degli intervalli." });
    }
  },

  async getIntervalById(req, res) {
    try {
      const interval = await goalIntervalModel.getIntervalById(req.params.id);
      if (!interval)
        return res.status(404).json({ message: "Intervallo non trovato." });
      res.json(interval);
    } catch (err) {
      res.status(500).json({ message: "Errore nel recupero dell'intervallo." });
    }
  },

  async updateInterval(req, res) {
    const { start_date, end_date } = req.body;

    try {
      const interval = await goalIntervalModel.getIntervalById(req.params.id);
      if (!interval)
        return res.status(404).json({ message: "Intervallo non trovato." });

      await goalIntervalModel.updateInterval(
        req.params.id,
        start_date,
        end_date
      );
      res.json({ message: "Intervallo aggiornato." });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Errore nell'aggiornamento dell'intervallo." });
    }
  },

  async deleteInterval(req, res) {
    try {
      const interval = await goalIntervalModel.getIntervalById(req.params.id);
      if (!interval)
        return res.status(404).json({ message: "Intervallo non trovato." });

      await goalIntervalModel.deleteInterval(req.params.id);
      res.json({ message: "Intervallo eliminato." });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Errore nella cancellazione dell'intervallo." });
    }
  },
};

export default goalIntervalController;
