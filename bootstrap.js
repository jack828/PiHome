const serviceLocator = require('service-locator')()
const express = require('express')
const app = express()
const initRoutes = require('./routes')
const initMiddleware = require('./middleware')
const initPwa = require('./pwa')
const initDatabase = require('./services/database')
const config = require('./config.json')

const bootstrap = done => {
  serviceLocator.register('config', config)
  serviceLocator.register('logger', console)

  initDatabase(serviceLocator, error => {
    if (error) return done(error)

    initMiddleware(serviceLocator, app)
    initPwa(serviceLocator, app)
    initRoutes(serviceLocator, app)

    serviceLocator.register('router', app)

    done(null, serviceLocator)
  })
}

module.exports = bootstrap
