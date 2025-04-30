document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleFormLink = document.getElementById('toggleFormLink');
    const toggleFormContainer = document.getElementById('toggleFormContainer');
    const registerFields = document.getElementById('registerFields');

    let isRegisterMode = false;

    // Переключение между входом и регистрацией
    if (toggleFormLink) {
        toggleFormLink.addEventListener('click', function(e) {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;

            if (isRegisterMode) {
                // Режим регистрации
                formTitle.textContent = 'Регистрация';
                submitBtn.textContent = 'Зарегистрироваться';
                registerFields.style.display = 'block';
                toggleFormContainer.style.display = 'none'; // Скрываем переключатель
            } else {
                // Режим входа
                formTitle.textContent = 'Вход в библиотеку';
                submitBtn.textContent = 'Войти';
                registerFields.style.display = 'none';
                toggleFormContainer.style.display = 'block'; // Показываем переключатель
            }
        });
    }

    // Обработка отправки формы
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const userData = {
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value.trim()
            };

            if (isRegisterMode) {
                userData.firstName = document.getElementById('first_name').value.trim();
                userData.lastName = document.getElementById('last_name').value.trim();

                if (!userData.firstName || !userData.lastName) {
                    alert('Пожалуйста, заполните все поля!');
                    return;
                }

                registerUser(userData);
            } else {
                loginUser(userData);
            }
        });
    }
});

// Функции регистрации и входа (остаются без изменений)
function registerUser(user) {
    localStorage.setItem('user_' + user.email, JSON.stringify(user));
    alert('Регистрация успешна!');
    window.location.href = 'main.html';
}

function loginUser(user) {
    const storedUser = JSON.parse(localStorage.getItem('user_' + user.email));

    if (!storedUser || storedUser.password !== user.password) {
        alert('Неверная почта или пароль!');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(storedUser));
    window.location.href = 'main.html';
}

// Регистрация
async function registerUser(user) {
    const response = await fetch('/api/api.php?action=register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

// Взять книгу
async function borrowBook(bookId) {
    const response = await fetch('/api/api.php?action=borrow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id: bookId })
    });
    return await response.json();
}