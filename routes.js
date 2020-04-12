const hat = require('hat')
const moment = require('moment')
const pick = require('lodash.pick')
const bodyParser = require('body-parser')

const initRoutes = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')
  const sensorCollections = {
    temperature: serviceDatabase.collection('temperature'),
    humidity: serviceDatabase.collection('humidity'),
    pressure: serviceDatabase.collection('pressure'),
    light: serviceDatabase.collection('light')
  }

  app.get('/', (req, res) => {
    console.log(req.ip)
    res.sendStatus(418)
  })

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
    const { insertedCount } = await sensorCollection.insertOne({
      nodeId,
      value,
      createdDate: new Date()
    })

    if (insertedCount !== 1) {
      return res.sendStatus(500)
    }
    res.sendStatus(200)
  })

  // Sends an array of points for each nodeId
  app.get('/api/sensor/:collectionName/:from/:to', async (req, res) => {
    const { collectionName, from, to } = req.params
    const collection = serviceDatabase.collection(collectionName)
    const [rawData, nodeData] = await Promise.all([
      collection
        .find({
          createdDate: {
            $gte: moment(from).toDate(),
            $lte: moment(to).toDate()
          }
        })
        .toArray(),
      nodes.find({}).toArray()
    ])

    const aggregated = rawData.reduce((data, datum) => {
      if (!data[datum.nodeId]) data[datum.nodeId] = []
      data[datum.nodeId].push(pick(datum, ['nickname', 'value', 'createdDate']))
      return data
    }, {})
    // {
    //  'AB:12:DB:44': [ ... ]
    // }
    const aggregatedData = Object.keys(aggregated).map(key => {
      const foundNode = nodeData.find(({ nodeId }) => nodeId === key)
      return {
        ...pick(foundNode, ['nodeId', 'colour', 'nickname']),
        data: aggregated[key]
      }
    })
    // [
    //   {
    //     nodeId: 'AB:12:DB:44',
    //     data: [ ... ]
    //   }
    // ]
    res.json(aggregatedData)
  })

  app.get('/api/nodes', async (req, res) => {
    const nodeData = await nodes
      .find({})
      .sort({ lastIdentified: -1 })
      .toArray()
    res.json(nodeData)
  })

  app.post('/api/node/rename/:nodeId', bodyParser.text(), async (req, res) => {
    const { nodeId } = req.params
    const nickname = req.body.trim()
    console.log({ nickname })

    await nodes.findOneAndUpdate(
      { nodeId },
      {
        $set: { nickname }
      }
    )
    res.sendStatus(200)
  })
}

module.exports = initRoutes
