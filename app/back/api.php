<?php
header("Content-Type: application/json");
require_once 'db.php';

$db = new Database();
$conn = $db->connect();

// Регистрация пользователя
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'register') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Валидация данных...

    $query = "INSERT INTO users (email, password, first_name, last_name) 
              VALUES (:email, :password, :first_name, :last_name)";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_BCRYPT));
    $stmt->bindParam(':first_name', $data['first_name']);
    $stmt->bindParam(':last_name', $data['last_name']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Registration failed']);
    }
}

// Вход пользователя
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);

    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (password_verify($data['password'], $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['user_id'];
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } else {
        echo json_encode(['error' => 'User not found']);
    }
}

// Взять книгу
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'borrow') {
    session_start();
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'Not authorized']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    // 1. Уменьшаем количество в общем пуле
    $updateQuery = "UPDATE books SET quantity = quantity - 1 WHERE book_id = :book_id AND quantity > 0";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bindParam(':book_id', $data['book_id']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // 2. Добавляем в взятые книги
        $insertQuery = "INSERT INTO borrowed_books (user_id, book_id) VALUES (:user_id, :book_id)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bindParam(':user_id', $_SESSION['user_id']);
        $stmt->bindParam(':book_id', $data['book_id']);
        $stmt->execute();

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Book not available']);
    }
}
?>