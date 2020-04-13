process.env.NODE_ENV = 'production'
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

/* add this to below:
        }),
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        analyzerMode: 'static',
        reportFilename: 'report.html'
*/
const webpackConfigProd = require('react-scripts/config/webpack.config')

require('react-scripts/scripts/build')
