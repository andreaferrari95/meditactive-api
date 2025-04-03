import db from "../../config/db.js";

const intervalGoalModel = {
  async associateGoalToInterval(intervalId, goalId) {
    if (!intervalId || !goalId) {
      throw new Error("Valori mancanti: intervalId o goalId");
    }

    await db.execute(
      "INSERT INTO interval_goals (interval_id, goal_id) VALUES (?, ?)",
      [intervalId, goalId]
    );
  },

  async getGoalsByInterval(intervalId) {
    const [rows] = await db.execute(
      `SELECT g.* 
       FROM goals g
       JOIN interval_goals ig ON g.id = ig.goal_id
       WHERE ig.interval_id = ?`,
      [intervalId]
    );
    return rows;
  },
};

export default intervalGoalModel;
