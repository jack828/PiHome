const serviceLocator = require('service-locator')()
const express = require('express')
const morgan = require('morgan')
const app = express()
const initRoutes = require('./routes')
const initDatabase = require('./services/database')
const config = require('./config.json')

const bootstrap = done => {
  app.use(morgan('dev'))

  serviceLocator.register('config', config)
  serviceLocator.register('logger', console)

  initDatabase(serviceLocator, error => {
    if (error) return done(error)

    initRoutes(serviceLocator, app)

    serviceLocator.register('router', app)

    done(null, serviceLocator)
  })
}

module.exports = bootstrap
