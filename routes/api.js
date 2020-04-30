const pick = require('lodash.pick')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const sub = require('date-fns/sub')

module.exports = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodeCollection = serviceDatabase.collection('node')
  const sensorCollections = {
    temperature: serviceDatabase.collection('temperature'),
    humidity: serviceDatabase.collection('humidity'),
    pressure: serviceDatabase.collection('pressure'),
    airQuality: serviceDatabase.collection('airQuality'),
    light: serviceDatabase.collection('light')
  }

  app.get('/api/sensor/:collectionName/:from/:to', async (req, res) => {
    const { collectionName, from, to } = req.params
    const collection = serviceDatabase.collection(collectionName)
    const [rawData, nodes] = await Promise.all([
      collection
        .find({
          createdDate: {
            $gte: new Date(from),
            $lte: new Date(to)
          }
        })
        .sort({ createdDate: -1 })
        .toArray(),
      nodeCollection.find({}).toArray()
    ])
    const nodeIndex = nodes.reduce(
      (index, node) => ({ ...index, [node.nodeId]: node }),
      {}
    )

    const resolvedData = rawData.map(({ _id, ...datum }) => ({
      ...datum,
      value: Number(datum.value),
      createdDate: new Date(datum.createdDate).getTime(),
      [datum.nodeId]: Number(datum.value)
    }))

    res.json(resolvedData)
  })

  app.get('/api/nodes', async (req, res) => {
    const nodes = await nodeCollection
      .find({})
      .sort({ lastReading: -1 })
      .toArray()

    const getSensorReadings = (nodeId, sensor) =>
      sensorCollections[sensor]
        .find({
          nodeId,
          createdDate: {
            // No stale data thank you
            $gte: sub(new Date(), { hours: 12 })
          }
        })
        .sort({ createdDate: -1 })
        .limit(1)

    const nodeIds = nodes.map(({ nodeId }) => nodeId)

    const nodeReadings = await Promise.all(
      nodeIds.map(async nodeId => {
        const sensors = Object.keys(sensorCollections)
        console.log({ nodeId, sensors })
        const sensorReadings = await Promise.all(
          sensors.map(sensor => getSensorReadings(nodeId, sensor))
        )
        return sensors.reduce(
          (readings, sensor, index) => ({
            ...readings,
            [sensor]: sensorReadings[index]
          }),
          {}
        )
      })
    )
    console.log(nodeReadings)
    res.json([
      ...nodes.map(node => ({
        ...node,
        recentReadings: nodeReadings[nodeIds.indexOf(node.nodeId)]
      }))
    ])
  })

  // update node
  app.post('/api/node', bodyParser.json(), async (req, res) => {
    // TODO schema!
    const { _id, ...nodeData } = req.body
    console.log(_id, nodeData)

    const result = await nodeCollection.findOneAndUpdate(
      { _id: ObjectId(_id) },
      {
        $set: nodeData
      }
    )
    console.log(result)
    res.sendStatus(200)
  })
}
