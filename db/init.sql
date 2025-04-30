-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
                                     user_id SERIAL PRIMARY KEY,
                                     email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Создание таблицы книг (общий пул)
CREATE TABLE IF NOT EXISTS books (
                                     book_id SERIAL PRIMARY KEY,
                                     title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Создание таблицы взятых книг
CREATE TABLE IF NOT EXISTS borrowed_books (
                                              borrow_id SERIAL PRIMARY KEY,
                                              user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'borrowed'
    );

-- Создание таблицы купленных книг
CREATE TABLE IF NOT EXISTS purchased_books (
                                               purchase_id SERIAL PRIMARY KEY,
                                               user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(10, 2) NOT NULL
    );

-- Тестовые данные (опционально)
INSERT INTO users (email, password, first_name, last_name) VALUES
                                                               ('user1@example.com', '$2y$10$EXAMPLEHASH', 'Иван', 'Иванов'),
                                                               ('user2@example.com', '$2y$10$EXAMPLEHASH', 'Петр', 'Петров');

INSERT INTO books (title, author, year, quantity, price) VALUES
                                                             ('1984', 'Джордж Оруэлл', 1949, 5, 500.00),
                                                             ('Мастер и Маргарита', 'Михаил Булгаков', 1966, 3, 750.00),
                                                             ('Преступление и наказание', 'Фёдор Достоевский', 1866, 7, 600.00);