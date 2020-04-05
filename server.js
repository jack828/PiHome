const bootstrap = require('./bootstrap')
const port = process.env.PORT || 3001

console.log('Bootsrapping...')
bootstrap((error, serviceLocator) => {
  if (error) throw error
  console.log('Bootsrapped, listening...')
  serviceLocator.router.listen(port, error => {
    if (error) throw error

    console.log(`Listening on port ${port}`)
  })
})
