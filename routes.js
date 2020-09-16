const express = require('express')
const { join } = require('path')
const addNodeRoutes = require('./routes/nodes')
const addApiRoutes = require('./routes/api')

const initRoutes = (serviceLocator, app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '/build')))
  } else {
    // shouldn't see this!
    app.get('/', (req, res) => {
      res.sendStatus(418)
    })
  }

  addNodeRoutes(serviceLocator, app)
  addApiRoutes(serviceLocator, app)
}

module.exports = initRoutes
