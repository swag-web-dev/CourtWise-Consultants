const router    = require('express').Router()
const db        = require('../db')
const requireAuth = require('../middleware/auth')

// GET /api/content  — public, returns all key/value pairs as an object
router.get('/', async (_req, res) => {
  try {
    const { rows } = await db.query('SELECT content_key, value FROM content')
    const map = {}
    rows.forEach(r => { map[r.content_key] = r.value })
    res.json(map)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/content/meta  — admin only, returns full rows with label/type info
router.get('/meta', requireAuth, async (_req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM content ORDER BY content_key')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/content/:key  — admin only, upsert a single value
router.put('/:key(*)', requireAuth, async (req, res) => {
  const key   = req.params.key
  const { value } = req.body
  if (value === undefined) return res.status(400).json({ error: 'value required' })

  try {
    await db.query(
      `INSERT INTO content (content_key, value) VALUES ($1, $2)
       ON CONFLICT (content_key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [key, value]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/content/bulk  — admin only, save multiple keys at once
router.put('/bulk', requireAuth, async (req, res) => {
  const entries = req.body // [{ key, value }, ...]
  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'Array of {key,value} required' })
  }
  try {
    const keys   = entries.map(e => e.key)
    const values = entries.map(e => e.value)
    await db.query(
      `INSERT INTO content (content_key, value)
       SELECT unnest($1::text[]), unnest($2::text[])
       ON CONFLICT (content_key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [keys, values]
    )
    res.json({ ok: true, saved: entries.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
