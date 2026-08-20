require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const app = express()

const devOrigins = ['http://localhost:5173', 'http://localhost:4173']
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? false : devOrigins }))
app.use(express.json())

app.use('/api/auth',        require('./routes/auth'))
app.use('/api/content',    require('./routes/content'))
app.use('/api/submissions', require('./routes/submissions'))
app.use('/api/tags',        require('./routes/tags'))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`CourtWise API running on port ${PORT}`))
