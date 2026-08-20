-- Run this once to set up the database
-- mysql -u root -p < setup.sql

CREATE DATABASE IF NOT EXISTS courtwise_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE courtwise_cms;

-- ── Content key/value store ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  content_key VARCHAR(255) UNIQUE NOT NULL,
  value       LONGTEXT,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Admin users ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Default admin account  (password: Admin1234!)  ───────────────────────────
-- IMPORTANT: Change this password immediately after first login.
INSERT IGNORE INTO admin_users (email, password_hash, name) VALUES (
  'admin@courtwiseconsultants.co.uk',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'Admin'
);
-- The hash above is bcrypt of "Admin1234!" — replace it with your own.
-- To generate a new hash: node -e "const b=require('bcryptjs');b.hash('YourPassword',10).then(console.log)"
