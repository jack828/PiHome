const initRoutes = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator

  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })

  app.get('/node/:identifier', async (req, res) => {
    const { identifier } = req.params
    console.log(`[ NODE ]: Identifying node "${identifier}"`)
    res.sendStatus(418)
  })

  app.get('/api/:collectionName/:from/:to', async (req, res) => {
    const { collectionName, from, to } = req.params
    const collection = serviceDatabase.collection(collectionName)
    const results = await collection.find({}).toArray()
    console.log(results)
    console.log(req.ip)
    res.json({ results })
  })
}

module.exports = initRoutes
