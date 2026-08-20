const db = require('./db')

module.exports = async function initDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS content (
      id          SERIAL PRIMARY KEY,
      content_key VARCHAR(255) UNIQUE NOT NULL,
      value       TEXT,
      updated_at  TIMESTAMP DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            SERIAL PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name          VARCHAR(255),
      created_at    TIMESTAMP DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255),
      phone      VARCHAR(50)  NOT NULL,
      service    VARCHAR(255),
      message    TEXT         NOT NULL,
      is_read    SMALLINT     NOT NULL DEFAULT 0,
      created_at TIMESTAMP    NOT NULL DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS cms_tags (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      color      VARCHAR(7)   NOT NULL DEFAULT '#C78A35',
      hidden     SMALLINT     NOT NULL DEFAULT 0,
      deleted    SMALLINT     NOT NULL DEFAULT 0,
      created_at TIMESTAMP    NOT NULL DEFAULT NOW()
    )
  `)

  await db.query(`ALTER TABLE cms_tags ADD COLUMN IF NOT EXISTS hidden  SMALLINT NOT NULL DEFAULT 0`)
  await db.query(`ALTER TABLE cms_tags ADD COLUMN IF NOT EXISTS deleted SMALLINT NOT NULL DEFAULT 0`)

  await db.query(`
    CREATE TABLE IF NOT EXISTS submission_tags (
      submission_id INT NOT NULL,
      tag_id        INT NOT NULL,
      PRIMARY KEY (submission_id, tag_id),
      FOREIGN KEY (submission_id) REFERENCES contact_submissions(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id)        REFERENCES cms_tags(id)            ON DELETE CASCADE
    )
  `)

  await db.query(`
    INSERT INTO admin_users (email, password_hash, name) VALUES (
      'admin@courtwiseconsultants.co.uk',
      '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
      'Admin'
    ) ON CONFLICT (email) DO NOTHING
  `)

  console.log('Database ready')
}
