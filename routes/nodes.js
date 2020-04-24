const hat = require('hat')

module.exports = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')
  const sensorCollections = {
    temperature: serviceDatabase.collection('temperature'),
    humidity: serviceDatabase.collection('humidity'),
    pressure: serviceDatabase.collection('pressure'),
    light: serviceDatabase.collection('light')
  }

  app.get('/node/identify(/)?', async (req, res) => {
    // cold start node - no saved identifier
    const nodeId = hat().slice(0, 4)
    const insertOp = await nodes.insertOne({
      nodeId,
      lastIdentified: new Date()
    })
    // welcome to the club
    console.log('[ NODE ] new node', nodeId, insertOp.insertedId)
    res.status(200).end(nodeId)
  })

  app.get('/node/identify/:nodeId', async (req, res) => {
    // TODO does this even make sense
    // two things can happen here:
    //  - new node to the network
    //  - known node re-identifying at boot
    //
    let nodeId = req.params.nodeId
    console.log(`[ NODE ] identifying node "${nodeId}"`)

    // See if we find one
    let node = await nodes.findOne({ nodeId })
    console.log('[ NODE ] read node', node)

    if (!node) {
      // unknown node, welcome to the cluuuuuuuub
      console.log('[ NODE ] new node', nodeId)
      await nodes.insertOne({
        nodeId,
        colour:
          '#' +
          Math.random()
            .toString(16)
            .substr(2, 6),
        lastIdentified: new Date()
      })
    } else {
      console.log('[ NODE ] known node', nodeId)
      await nodes.findOneAndUpdate(
        { _id: node._id },
        {
          $set: { lastIdentified: new Date() }
        }
      )
    }

    console.log('[ NODE ] done identifying node', nodeId)
    return res.status(200).end(nodeId)
  })

  app.get('/node/log/:nodeId/:sensor/:value', async (req, res) => {
    const { nodeId, sensor, value } = req.params
    const sensorCollection = sensorCollections[sensor]
    if (!sensorCollection) return res.sendStatus(404)

    // TODO identify if never seen node before
    // TODO error handling
    const readingTime = new Date()
    const { insertedCount } = await sensorCollection.insertOne({
      nodeId,
      value,
      createdDate: readingTime
    })

    if (insertedCount !== 1) {
      return res.sendStatus(500)
    }
    await nodes.findOneAndUpdate(
      { nodeId },
      {
        $set: { lastReading: readingTime }
      }
    )
    res.sendStatus(200)
  })
}
