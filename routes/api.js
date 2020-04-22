const pick = require('lodash.pick')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

module.exports = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')

  app.get('/api/sensor/:collectionName/:from/:to', async (req, res) => {
    const { collectionName, from, to } = req.params
    const collection = serviceDatabase.collection(collectionName)
    const [rawData, nodeData] = await Promise.all([
      collection
        .find({
          createdDate: {
            $gte: new Date(from),
            $lte: new Date(to)
          }
        })
        .sort({ createdDate: -1 })
        .toArray(),
      nodes.find({}).toArray()
    ])
    const nodeIndex = nodeData.reduce(
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
    const nodeData = await nodes
      .find({})
      .sort({ lastReading: -1 })
      .toArray()
    res.json(nodeData)
  })

  // update node
  app.post('/api/node', bodyParser.json(), async (req, res) => {
    // TODO schema!
    const { _id, ...nodeData } = req.body
    console.log(_id, nodeData)

    const result = await nodes.findOneAndUpdate(
      { _id: ObjectId(_id) },
      {
        $set: nodeData
      }
    )
    console.log(result)
    res.sendStatus(200)
  })
}
