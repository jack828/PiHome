const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3001

app.use(morgan('dev'))

app.get('/api/test', (req, res) => res.sendStatus(418))

app.listen(port, (error) => {
  if (error) throw error

  console.log(`Listening on port ${port}`)
})
