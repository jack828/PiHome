const MongoClient = require('mongodb').MongoClient
const mongodbUri = require('mongodb-uri')

const init = (serviceLocator, done) => {
  const connectionUri =
    process.env.MONGO_URL || serviceLocator.config.databaseUrl
  if (connectionUri === undefined) {
    done(
      new Error(
        'You must provide a database URL in config.databaseUrl or in the environment variable MONGO_URL'
      )
    )
  }
  const { database } = mongodbUri.parse(connectionUri)
  console.log('Connecting to DB, ', connectionUri)
  MongoClient.connect(
    connectionUri,
    {
      native_parser: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, client) => {
      if (err) {
        serviceLocator.logger.error(err)
        return done(err)
      }
      const db = client.db(database)
      serviceLocator.logger.info('Connected to', database)
      serviceLocator.register('serviceDatabase', db)
      serviceLocator.register('serviceDatabaseClient', client)
      done()
    }
  )
}

module.exports = init
