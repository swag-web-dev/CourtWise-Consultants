const router      = require('express').Router()
const db          = require('../db')
const requireAuth = require('../middleware/auth')

db.query(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255),
    phone      VARCHAR(50)  NOT NULL,
    service    VARCHAR(255),
    message    TEXT         NOT NULL,
    is_read    TINYINT(1)   NOT NULL DEFAULT 0,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error('submissions table init:', err))

// GET all — includes tags array per submission
router.get('/', requireAuth, async (_req, res) => {
  try {
    const [subs] = await db.query('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    const [tagRows] = await db.query(`
      SELECT st.submission_id, t.id, t.name, t.color, t.deleted
      FROM submission_tags st
      JOIN cms_tags t ON st.tag_id = t.id
    `).catch(() => [[]])
    const tagMap = {}
    for (const r of tagRows) {
      if (!tagMap[r.submission_id]) tagMap[r.submission_id] = []
      tagMap[r.submission_id].push({ id: r.id, name: r.name, color: r.color, deleted: r.deleted })
    }
    res.json(subs.map(s => ({ ...s, tags: tagMap[s.id] || [] })))
  } catch { res.status(500).json({ error: 'Failed to fetch submissions' }) }
})

// POST new submission (public)
router.post('/', async (req, res) => {
  const { name, email, phone, service, message } = req.body
  if (!name?.trim() || !phone?.trim() || !message?.trim())
    return res.status(400).json({ error: 'Missing required fields' })
  try {
    await db.query(
      'INSERT INTO contact_submissions (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email?.trim() || null, phone.trim(), service?.trim() || null, message.trim()]
    )
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to save submission' }) }
})

// PATCH mark as read
router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    await db.query('UPDATE contact_submissions SET is_read = 1 WHERE id = ?', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to update' }) }
})

// PATCH mark as unread
router.patch('/:id/unread', requireAuth, async (req, res) => {
  try {
    await db.query('UPDATE contact_submissions SET is_read = 0 WHERE id = ?', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to update' }) }
})

// DELETE submission
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM contact_submissions WHERE id = ?', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to delete' }) }
})

module.exports = router
