const manifestConfig = () => ({
  short_name: 'PiHome',
  name: 'PiHome',
  icons: [
    {
      src: 'favicon.ico',
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon'
    },
    {
      src: 'logo192.png',
      type: 'image/png',
      sizes: '192x192'
    },
    {
      src: 'logo512.png',
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
    console.log('manifest req')
    res.json(manifestConfig({}))
  })
}
