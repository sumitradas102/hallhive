CREATE DATABASE hallhive;
CREATE USER 'halluser'@'localhost' IDENTIFIED BY 'Sumaiya22shafa44@sql';
GRANT ALL PRIVILEGES ON hallhive.* TO 'halluser'@'localhost';
FLUSH PRIVILEGES;

USE hallhive;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    session VARCHAR(20),
    department VARCHAR(100),
    registrationNumber VARCHAR(30) UNIQUE,
    email VARCHAR(100) UNIQUE,
    contactNumber VARCHAR(30),
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL,
    profilePicture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    event_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_no VARCHAR(10) UNIQUE NOT NULL,
    capacity INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS room_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    room_id INT,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS room_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    room_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

ALTER TABLE complaints
  ADD COLUMN status VARCHAR(32) DEFAULT 'Not Solved',
  ADD COLUMN admin_feedback TEXT;
  
alter table notices
add column   attachment VARCHAR(255);

DROP TABLE IF EXISTS events;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(200),
    attachment VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES ('Provost', 'provost@bsch1223', '$2b$10$uHX6I/N1hD/BOaFcP86jcuyVhplI8XMBtUdIYmTvqk/SxqJO0TUmy', 'admin');

ALTER TABLE complaints ADD COLUMN subject VARCHAR(255);

CREATE TABLE IF NOT EXISTS allowed_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    registrationNumber VARCHAR(30) NOT NULL UNIQUE,
    room_no VARCHAR(20) NOT NULL  -- e.g., 'B-304-1'
);


UPDATE users SET password='$2b$10$zQvrzmB224MMBEkDL7zinOUqG/SZsqzF75TMWYo98YXZEXUlz2pMq' WHERE email='provost@bsch1223' AND role='admin';


SELECT id, name, email, password, role FROM users WHERE role='admin';

UPDATE users SET password='$2b$10$zQvrzmB224MMBEkDL7zinOUqG/SZsqzF75TMWYo98YXZEXUlz2pMq' WHERE email='provost@bsch1223' AND role='admin';

ALTER TABLE rooms
  ADD COLUMN block CHAR(1),
  ADD COLUMN floor INT;
  
  
  INSERT INTO rooms (room_no, block, floor, capacity) VALUES
-- Block A, Floor 1
('A-101', 'A', 1, 4), ('A-102', 'A', 1, 4), ('A-103', 'A', 1, 4), ('A-104', 'A', 1, 4), ('A-105', 'A', 1, 4),
('A-106', 'A', 1, 4), ('A-107', 'A', 1, 4), ('A-108', 'A', 1, 4), ('A-109', 'A', 1, 4), ('A-110', 'A', 1, 4),
-- Block A, Floor 2
('A-201', 'A', 2, 4), ('A-202', 'A', 2, 4), ('A-203', 'A', 2, 4), ('A-204', 'A', 2, 4), ('A-205', 'A', 2, 4),
('A-206', 'A', 2, 4), ('A-207', 'A', 2, 4), ('A-208', 'A', 2, 4), ('A-209', 'A', 2, 4), ('A-210', 'A', 2, 4),
-- Block A, Floor 3
('A-301', 'A', 3, 4), ('A-302', 'A', 3, 4), ('A-303', 'A', 3, 4), ('A-304', 'A', 3, 4), ('A-305', 'A', 3, 4),
('A-306', 'A', 3, 4), ('A-307', 'A', 3, 4), ('A-308', 'A', 3, 4), ('A-309', 'A', 3, 4), ('A-310', 'A', 3, 4),
-- Block A, Floor 4
('A-401', 'A', 4, 4), ('A-402', 'A', 4, 4), ('A-403', 'A', 4, 4), ('A-404', 'A', 4, 4), ('A-405', 'A', 4, 4),
('A-406', 'A', 4, 4), ('A-407', 'A', 4, 4), ('A-408', 'A', 4, 4), ('A-409', 'A', 4, 4), ('A-410', 'A', 4, 4),

-- Block B, Floor 1
('B-101', 'B', 1, 4), ('B-102', 'B', 1, 4), ('B-103', 'B', 1, 4), ('B-104', 'B', 1, 4), ('B-105', 'B', 1, 4),
('B-106', 'B', 1, 4), ('B-107', 'B', 1, 4), ('B-108', 'B', 1, 4), ('B-109', 'B', 1, 4), ('B-110', 'B', 1, 4),
-- Block B, Floor 2
('B-201', 'B', 2, 4), ('B-202', 'B', 2, 4), ('B-203', 'B', 2, 4), ('B-204', 'B', 2, 4), ('B-205', 'B', 2, 4),
('B-206', 'B', 2, 4), ('B-207', 'B', 2, 4), ('B-208', 'B', 2, 4), ('B-209', 'B', 2, 4), ('B-210', 'B', 2, 4),
-- Block B, Floor 3
('B-301', 'B', 3, 4), ('B-302', 'B', 3, 4), ('B-303', 'B', 3, 4), ('B-304', 'B', 3, 4), ('B-305', 'B', 3, 4),
('B-306', 'B', 3, 4), ('B-307', 'B', 3, 4), ('B-308', 'B', 3, 4), ('B-309', 'B', 3, 4), ('B-310', 'B', 3, 4),
-- Block B, Floor 4
('B-401', 'B', 4, 4), ('B-402', 'B', 4, 4), ('B-403', 'B', 4, 4), ('B-404', 'B', 4, 4), ('B-405', 'B', 4, 4),
('B-406', 'B', 4, 4), ('B-407', 'B', 4, 4), ('B-408', 'B', 4, 4), ('B-409', 'B', 4, 4), ('B-410', 'B', 4, 4),

-- Block C, Floor 1
('C-101', 'C', 1, 4), ('C-102', 'C', 1, 4), ('C-103', 'C', 1, 4), ('C-104', 'C', 1, 4), ('C-105', 'C', 1, 4),
('C-106', 'C', 1, 4), ('C-107', 'C', 1, 4), ('C-108', 'C', 1, 4), ('C-109', 'C', 1, 4), ('C-110', 'C', 1, 4),
-- Block C, Floor 2
('C-201', 'C', 2, 4), ('C-202', 'C', 2, 4), ('C-203', 'C', 2, 4), ('C-204', 'C', 2, 4), ('C-205', 'C', 2, 4),
('C-206', 'C', 2, 4), ('C-207', 'C', 2, 4), ('C-208', 'C', 2, 4), ('C-209', 'C', 2, 4), ('C-210', 'C', 2, 4),
-- Block C, Floor 3
('C-301', 'C', 3, 4), ('C-302', 'C', 3, 4), ('C-303', 'C', 3, 4), ('C-304', 'C', 3, 4), ('C-305', 'C', 3, 4),
('C-306', 'C', 3, 4), ('C-307', 'C', 3, 4), ('C-308', 'C', 3, 4), ('C-309', 'C', 3, 4), ('C-310', 'C', 3, 4),
-- Block C, Floor 4
('C-401', 'C', 4, 4), ('C-402', 'C', 4, 4), ('C-403', 'C', 4, 4), ('C-404', 'C', 4, 4), ('C-405', 'C', 4, 4),
('C-406', 'C', 4, 4), ('C-407', 'C', 4, 4), ('C-408', 'C', 4, 4), ('C-409', 'C', 4, 4), ('C-410', 'C', 4, 4),

-- Block D, Floor 1
('D-101', 'D', 1, 4), ('D-102', 'D', 1, 4), ('D-103', 'D', 1, 4), ('D-104', 'D', 1, 4), ('D-105', 'D', 1, 4),
('D-106', 'D', 1, 4), ('D-107', 'D', 1, 4), ('D-108', 'D', 1, 4), ('D-109', 'D', 1, 4), ('D-110', 'D', 1, 4),
-- Block D, Floor 2
('D-201', 'D', 2, 4), ('D-202', 'D', 2, 4), ('D-203', 'D', 2, 4), ('D-204', 'D', 2, 4), ('D-205', 'D', 2, 4),
('D-206', 'D', 2, 4), ('D-207', 'D', 2, 4), ('D-208', 'D', 2, 4), ('D-209', 'D', 2, 4), ('D-210', 'D', 2, 4),
-- Block D, Floor 3
('D-301', 'D', 3, 4), ('D-302', 'D', 3, 4), ('D-303', 'D', 3, 4), ('D-304', 'D', 3, 4), ('D-305', 'D', 3, 4),
('D-306', 'D', 3, 4), ('D-307', 'D', 3, 4), ('D-308', 'D', 3, 4), ('D-309', 'D', 3, 4), ('D-310', 'D', 3, 4),
-- Block D, Floor 4
('D-401', 'D', 4, 4), ('D-402', 'D', 4, 4), ('D-403', 'D', 4, 4), ('D-404', 'D', 4, 4), ('D-405', 'D', 4, 4),
('D-406', 'D', 4, 4), ('D-407', 'D', 4, 4), ('D-408', 'D', 4, 4), ('D-409', 'D', 4, 4), ('D-410', 'D', 4, 4);

SELECT * FROM rooms WHERE room_no = 'D-108';
DESCRIBE users;


SELECT id FROM users WHERE email = 'sumaiyashafa.15@gmail.com';
SELECT * FROM room_assignments WHERE user_id = 1;

SELECT room_no FROM rooms WHERE id = 57;


use hallhive;
SELECT * FROM users WHERE role='admin';
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'provost@bsch1223.com', '$2b$10$HSkXTBW4UcGKrCjprttcXOv13hIR.sR6TQQLXqASsd823v9vxgL1i', 'admin');










