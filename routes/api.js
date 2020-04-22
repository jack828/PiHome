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
