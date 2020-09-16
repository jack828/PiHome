const manifestConfig = () => ({
  short_name: 'PiHome',
  name: 'PiHome',
  icons: [
    {
      src: 'favicon.ico',
      sizes: '128x128',
      type: 'image/x-icon'
    },
    {
      src: 'icons8-home64.png',
      type: 'image/png',
      sizes: '64x64'
    },
    {
      src: 'icons8-home256.png',
      type: 'image/png',
      sizes: '256x256'
    },
    {
      src: 'icons8-home512.png',
      type: 'image/png',
      sizes: '512x512'
    }
  ],
  start_url: '/',
  scope: '/',
  display: 'minimal-ui',
  theme_color: '#ffffff',
  background_color: '#343a40'
})

module.exports = (serviceLocator, app) => {
  app.get('/manifest.json', async (req, res) => {
    res.json(manifestConfig({}))
  })
}
