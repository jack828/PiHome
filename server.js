const bootstrap = require('./bootstrap')
const port = process.env.PORT || 3001

bootstrap((error, serviceLocator) => {
  if (error) throw error
  serviceLocator.router.listen(port, error => {
    if (error) throw error

    console.log(`Listening on port ${port}`)
  })
})
