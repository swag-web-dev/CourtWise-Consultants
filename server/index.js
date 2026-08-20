require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const app = express()

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.use('/api/auth',        require('./routes/auth'))
app.use('/api/content',    require('./routes/content'))
app.use('/api/submissions', require('./routes/submissions'))
app.use('/api/tags',        require('./routes/tags'))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`CourtWise API running on http://localhost:${PORT}`))
