const serviceLocator = require('service-locator')()
const express = require('express')
const morgan = require('morgan')
const app = express()
const initRoutes = require('./routes')

const bootstrap = done => {
  app.use(morgan('dev'))

  initRoutes(serviceLocator, app)

  serviceLocator.register('router', app)

  done(null, serviceLocator)
}

module.exports = bootstrap
