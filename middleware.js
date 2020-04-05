const morgan = require('morgan')

module.exports = (serviceLocator, app ) => {
  app.use(morgan('dev'))
  app.use((req, res, next) => {
    // Send back the requesting IP address

    res.setHeader('x-ip-address', req.ip)
    next()
  })
}
