const router      = require('express').Router()
const db          = require('../db')
const requireAuth = require('../middleware/auth')

// Auto-create tables
db.query(`
  CREATE TABLE IF NOT EXISTS cms_tags (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    color      VARCHAR(7)   NOT NULL DEFAULT '#C78A35',
    hidden     TINYINT(1)   NOT NULL DEFAULT 0,
    deleted    TINYINT(1)   NOT NULL DEFAULT 0,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error('cms_tags init:', err))

// Add columns if table already existed without them
db.query(`ALTER TABLE cms_tags ADD COLUMN hidden TINYINT(1) NOT NULL DEFAULT 0`).catch(() => {})
db.query(`ALTER TABLE cms_tags ADD COLUMN deleted TINYINT(1) NOT NULL DEFAULT 0`).catch(() => {})

db.query(`
  CREATE TABLE IF NOT EXISTS submission_tags (
    submission_id INT NOT NULL,
    tag_id        INT NOT NULL,
    PRIMARY KEY (submission_id, tag_id),
    FOREIGN KEY (submission_id) REFERENCES contact_submissions(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id)        REFERENCES cms_tags(id)            ON DELETE CASCADE
  )
`).catch(err => console.error('submission_tags init:', err))

// GET all non-deleted tags
router.get('/', requireAuth, async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cms_tags WHERE deleted = 0 ORDER BY created_at ASC')
    res.json(rows)
  } catch { res.status(500).json({ error: 'Failed to fetch tags' }) }
})

// POST create tag
router.post('/', requireAuth, async (req, res) => {
  const { name, color } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'Name required' })
  try {
    const [result] = await db.query(
      'INSERT INTO cms_tags (name, color) VALUES (?, ?)',
      [name.trim(), color || '#C78A35']
    )
    res.json({ id: result.insertId, name: name.trim(), color: color || '#C78A35', hidden: 0 })
  } catch { res.status(500).json({ error: 'Failed to create tag' }) }
})

// PATCH update tag (name, color, hidden)
router.patch('/:id', requireAuth, async (req, res) => {
  const { name, color, hidden } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'Name required' })
  try {
    await db.query(
      'UPDATE cms_tags SET name = ?, color = ?, hidden = ? WHERE id = ?',
      [name.trim(), color || '#C78A35', hidden ? 1 : 0, req.params.id]
    )
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to update tag' }) }
})

// DELETE tag (soft delete — keeps existing assignments intact)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.query('UPDATE cms_tags SET deleted = 1 WHERE id = ?', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to delete tag' }) }
})

// POST assign tag to submission
router.post('/:tagId/assign/:subId', requireAuth, async (req, res) => {
  try {
    await db.query(
      'INSERT IGNORE INTO submission_tags (submission_id, tag_id) VALUES (?, ?)',
      [req.params.subId, req.params.tagId]
    )
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to assign tag' }) }
})

// DELETE remove tag from submission
router.delete('/:tagId/assign/:subId', requireAuth, async (req, res) => {
  try {
    await db.query(
      'DELETE FROM submission_tags WHERE submission_id = ? AND tag_id = ?',
      [req.params.subId, req.params.tagId]
    )
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to remove tag' }) }
})

module.exports = router
