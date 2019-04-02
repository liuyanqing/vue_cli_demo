const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/api-ext': {
        target: 'https://xxxx.xx.com',
        changeOrigin: true,
        ws: true,
      },
      '/open/latest-trades': {
        target: 'http://xxxx.xx:8888',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '/api-ext/open/latest-trades': '/open/latest-trades'
        }
      },
    },
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: process.env.NODE_ENV === 'production'
    ? '//'
    : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: '@import "@/style/variables.scss";',
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new HtmlWebpackInlineSourcePlugin(),
        ],
        externals: {
          vue: 'Vue',
        },
      };
    }
    return {
      plugins: [
        new HtmlWebpackInlineSourcePlugin(),
      ],
      externals: {
        vue: 'Vue',
      },
    };
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('html')
        .tap((args) => {
          args[0].inlineSource = '.(js|css)$';
          return args;
        });
    }
  },
};
