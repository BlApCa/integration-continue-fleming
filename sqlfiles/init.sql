CREATE DATABASE IF NOT EXISTS app_db;

USE app_db;

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users (email, password, is_admin) VALUES
    ('loise.fenoll@ynov.com', 'PvdrTAzTeR247sDnAZBr', TRUE);