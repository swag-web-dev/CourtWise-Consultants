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
  'CourtWise',
  '$2a$10$UacPsxFuuBvf41G8zXEdueZdTC/vA2vGLlpD6SXIC0lCXCrbyp/am',
  'CourtWise'
) ON CONFLICT (email) DO NOTHING;
-- The hash above is bcrypt of "1234"
-- To generate a new hash: node -e "const b=require('bcryptjs');b.hash('YourPassword',10).then(console.log)"
