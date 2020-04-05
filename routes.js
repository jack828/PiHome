const initRoutes = (serviceLocator, app) => {
  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })
}

module.exports = initRoutes
