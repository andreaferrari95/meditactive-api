import db from "../../config/db.js";

const goalModel = {
  async getAllGoals() {
    const [rows] = await db.execute("SELECT * FROM goals");
    return rows;
  },

  async getGoalById(id) {
    const [rows] = await db.execute("SELECT * FROM goals WHERE id = ?", [id]);
    return rows[0];
  },

  async createGoal(title, description, type) {
    const [result] = await db.execute(
      "INSERT INTO goals (title, description, type) VALUES (?, ?, ?)",
      [title, description, type]
    );
    return result.insertId;
  },

  async updateGoal(id, title, description, type) {
    await db.execute(
      "UPDATE goals SET title = ?, description = ?, type = ? WHERE id = ?",
      [title, description, type, id]
    );
  },

  async deleteGoal(id) {
    await db.execute("DELETE FROM goals WHERE id = ?", [id]);
  },
};

export default goalModel;
