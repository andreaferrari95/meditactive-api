const db = require("../../config/db");

module.exports = {
  async createInterval(userId, startDate, endDate) {
    const [result] = await db.execute(
      "INSERT INTO goal_intervals (user_id, start_date, end_date) VALUES (?, ?, ?)",
      [userId, startDate, endDate]
    );
    return result.insertId;
  },

  async getAllIntervals(filters = {}) {
    let query = "SELECT * FROM goal_intervals";
    const params = [];

    const conditions = [];

    if (filters.goalId) {
      query += `
        JOIN interval_goals ON goal_intervals.id = interval_goals.interval_id
        WHERE interval_goals.goal_id = ?
      `;
      params.push(filters.goalId);
    } else {
      if (filters.startDate) {
        conditions.push("start_date >= ?");
        params.push(filters.startDate);
      }
      if (filters.endDate) {
        conditions.push("end_date <= ?");
        params.push(filters.endDate);
      }
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
    }

    const [rows] = await db.execute(query, params);
    return rows;
  },

  async getIntervalById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM goal_intervals WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async updateInterval(id, startDate, endDate) {
    await db.execute(
      "UPDATE goal_intervals SET start_date = ?, end_date = ? WHERE id = ?",
      [startDate, endDate, id]
    );
  },

  async deleteInterval(id) {
    await db.execute("DELETE FROM goal_intervals WHERE id = ?", [id]);
  },
};
