const router      = require('express').Router()
const db          = require('../db')
const requireAuth = require('../middleware/auth')

// GET all — includes tags array per submission
router.get('/', requireAuth, async (_req, res) => {
  try {
    const { rows: subs } = await db.query('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    const { rows: tagRows } = await db.query(`
      SELECT st.submission_id, t.id, t.name, t.color, t.deleted
      FROM submission_tags st
      JOIN cms_tags t ON st.tag_id = t.id
    `).catch(() => ({ rows: [] }))
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
      'INSERT INTO contact_submissions (name, email, phone, service, message) VALUES ($1, $2, $3, $4, $5)',
      [name.trim(), email?.trim() || null, phone.trim(), service?.trim() || null, message.trim()]
    )
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to save submission' }) }
})

// PATCH mark as read
router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    await db.query('UPDATE contact_submissions SET is_read = 1 WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to update' }) }
})

// PATCH mark as unread
router.patch('/:id/unread', requireAuth, async (req, res) => {
  try {
    await db.query('UPDATE contact_submissions SET is_read = 0 WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to update' }) }
})

// DELETE submission
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM contact_submissions WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch { res.status(500).json({ error: 'Failed to delete' }) }
})

module.exports = router
