const hat = require('hat')

const initRoutes = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')

  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })

  app.get('/node/identify(/)?', async (req, res) => {
    // cold start node - no saved identifier
    const identifier = hat().slice(0, 4)
    const insertOp = await nodes.insertOne({
      id: identifier,
      lastIdentified: new Date()
    })
    // welcome to the club
    console.log('[ NODE ] new node', identifier, insertOp.insertedId)
    res.status(200).end(identifier)
  })

  app.get('/node/identify/:identifier', async (req, res) => {
    // two things can happen here:
    //  - new node to the network
    //  - known node re-identifying at boot
    //
    let identifier = req.params.identifier
    console.log(`[ NODE ] identifying node "${identifier}"`)

    // See if we find one
    let node = await nodes.findOne({ id: identifier })
    console.log('[ NODE ] read node', node)

    if (!node) {
      // unknown node, welcome to the cluuuuuuuub
      console.log('[ NODE ] new node', identifier)
      await nodes.insertOne({
        id: identifier,
        lastIdentified: new Date()
      })
    } else {
      console.log('[ NODE ] known node', identifier)
      await nodes.findOneAndUpdate(
        { _id: node._id },
        {
          $set: { lastIdentified: new Date() }
        }
      )
    }

    console.log('[ NODE ] done identifying node', identifier)
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
