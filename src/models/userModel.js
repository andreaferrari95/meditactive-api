const db = require("../../config/db");

module.exports = {
  // Crea un nuovo utente
  async createUser(name, surname, email, hashedPassword) {
    const [result] = await db.execute(
      "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)",
      [name, surname, email, hashedPassword]
    );
    return result.insertId;
  },

  // Ottieni tutti gli utenti
  async getAllUsers() {
    const [rows] = await db.execute(
      "SELECT id, name, surname, email FROM users"
    );
    return rows;
  },

  // Ottieni un utente per ID
  async getUserById(id) {
    const [rows] = await db.execute(
      "SELECT id, name, surname, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Modifica un utente
  async updateUser(id, name, surname, email) {
    await db.execute(
      "UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?",
      [name, surname, email, id]
    );
  },

  // Elimina un utente
  async deleteUser(id) {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
  },
};
