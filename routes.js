const hat = require('hat')

const initRoutes = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')

  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })

  app.get('/node/identify(/)?(:identifier)?', async (req, res) => {
    // Give node ids if not provided
    let identifier = req.params.identifier || hat().slice(0, 4)
    console.log(`[ NODE ]: Identifying node "${identifier}"`)
    const node = await nodes.findOne({ id: identifier })
    console.log(node)
    if (!node) {
      await nodes.insertOne({
        id: identifier,
        lastIdentified: new Date()
      })
    } else {
      await nodes.findOneAndUpdate({ _id: node._id }, {
        $set: { lastIdentified: new Date() }
      })
    }

    return res.status(200).end(identifier)
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
