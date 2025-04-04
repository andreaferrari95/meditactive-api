
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE interval_goals;
TRUNCATE TABLE goal_intervals;
TRUNCATE TABLE goals;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 👤 UTENTI
INSERT INTO users (id, name, surname, email, password, avatar_url) VALUES
(1, 'Alice', 'Serena', 'alice@example.com', '$2b$10$w3WgF0T6lZbGVcS5j3OkDeQnLzLVzDw1OEPC4Cq0M1OpYB0S8OqS6', NULL), -- password123
(2, 'Luca', 'Mentale', 'luca@example.com', '$2b$10$CzX2Pa5/6M7r3lPo1RTzz.2oMqbS0WzE8JyyDoULxeBNVKkzN2.kG', NULL); -- meditativo

-- 🧘 GOALS
INSERT INTO goals (id, title, description, type) VALUES
(1, 'Meditazione Giornaliera', '10 min ogni mattina', 'daily'),
(2, 'Respiro Consapevole', '5 minuti durante le pause', 'daily'),
(3, 'Diario della Gratitudine', 'Scrivi 3 cose ogni sera', 'daily');

-- 📆 INTERVALLI
INSERT INTO goal_intervals (id, user_id, start_date, end_date) VALUES
(1, 1, '2024-04-01', '2024-04-07'),
(2, 2, '2024-04-10', '2024-04-20');

-- 🔗 GOAL ↔ INTERVAL
INSERT INTO interval_goals (interval_id, goal_id) VALUES
(1, 1),
(1, 2),
(2, 3);
