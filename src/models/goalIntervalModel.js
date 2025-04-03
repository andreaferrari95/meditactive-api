import db from "../../config/db.js";

const goalIntervalModel = {
  async createInterval(userId, startDate, endDate) {
    const [result] = await db.execute(
      "INSERT INTO goal_intervals (user_id, start_date, end_date) VALUES (?, ?, ?)",
      [userId, startDate, endDate]
    );
    return result.insertId;
  },

  async getAllIntervals(filters = {}) {
    let query = `
      SELECT DISTINCT gi.*
      FROM goal_intervals gi
      LEFT JOIN interval_goals ig ON gi.id = ig.interval_id
    `;
    const params = [];
    const conditions = [];

    if (filters.goalId) {
      conditions.push("ig.goal_id = ?");
      params.push(filters.goalId);
    }

    if (filters.startDate) {
      conditions.push("gi.start_date >= ?");
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      conditions.push("gi.end_date <= ?");
      params.push(filters.endDate);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
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

export default goalIntervalModel;
