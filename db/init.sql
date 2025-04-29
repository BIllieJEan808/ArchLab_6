CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Можно добавить тестовые данные
INSERT INTO users (first_name, last_name, email) VALUES
                                                     ('Иван', 'Иванов', 'ivan@example.com'),
                                                     ('Петр', 'Петров', 'petr@example.com');