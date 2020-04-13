const addNodeRoutes = require('./routes/nodes')
const addApiRoutes = require('./routes/api')

const initRoutes = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')

  // shouldn't see this!
  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })

  addNodeRoutes(serviceLocator, app)
  addApiRoutes(serviceLocator, app)

}

module.exports = initRoutes
