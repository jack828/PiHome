const pick = require('lodash.pick')
const bodyParser = require('body-parser')

module.exports = (serviceLocator, app) => {
  const { serviceDatabase } = serviceLocator
  const nodes = serviceDatabase.collection('node')
  // Sends an array of points for each nodeId
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
