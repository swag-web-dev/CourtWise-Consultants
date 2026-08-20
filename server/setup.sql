-- PostgreSQL setup — run once against your database
-- psql $DATABASE_URL -f setup.sql

-- ── Content key/value store ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content (
  id          SERIAL PRIMARY KEY,
  content_key VARCHAR(255) UNIQUE NOT NULL,
  value       TEXT,
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ── Admin users ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255),
  created_at    TIMESTAMP DEFAULT NOW()
);

-- ── Default admin account  (password: Admin1234!)  ───────────────────────────
-- IMPORTANT: Change this password immediately after first login.
INSERT INTO admin_users (email, password_hash, name) VALUES (
  'admin@courtwiseconsultants.co.uk',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'Admin'
) ON CONFLICT (email) DO NOTHING;
-- The hash above is bcrypt of "Admin1234!" — replace it with your own.
-- To generate a new hash: node -e "const b=require('bcryptjs');b.hash('YourPassword',10).then(console.log)"
