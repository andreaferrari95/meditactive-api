-- Creazione database (opzionale, se non già esistente)
CREATE DATABASE IF NOT EXISTS meditactive;
USE meditactive;

-- Tabella utenti
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella obiettivi predefiniti
CREATE TABLE IF NOT EXISTS goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('daily', 'monthly', 'yearly') NOT NULL
);

-- Tabella intervalli di obiettivi
CREATE TABLE IF NOT EXISTS goal_intervals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Associazione obiettivi-intervalli
CREATE TABLE IF NOT EXISTS interval_goals (
  interval_id INT NOT NULL,
  goal_id INT NOT NULL,
  PRIMARY KEY (interval_id, goal_id),
  FOREIGN KEY (interval_id) REFERENCES goal_intervals(id) ON DELETE CASCADE,
  FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
);
