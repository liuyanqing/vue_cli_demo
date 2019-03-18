const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '//'
    : '/',
  productionSourceMap: false,
  configureWebpack: config => {
    console.log(config)
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new HtmlWebpackInlineSourcePlugin()
        ],
        externals: {
          'vue': 'Vue',
        },
      }
    } else {

    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('html')
        .tap(args => {
          args[0].inlineSource = '.(js|css)$'
          return args
        })
    } else {

    }
  }
}
