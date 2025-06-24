CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birth_date DATE,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users (email, password, is_admin)
VALUES (
    '${ADMIN_EMAIL}',
    '${ADMIN_PASSWORD}',
    TRUE
) ON DUPLICATE KEY UPDATE is_admin = TRUE;