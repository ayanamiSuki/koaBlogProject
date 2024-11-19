const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 10000,
    https: false,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      progress: true,
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://123.207.64.4',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  //webpack部分配置
  chainWebpack: (config) => {
    config.resolve.alias.set('assets', resolve('src/assets')).set('@', resolve('src'))
    // #endregion
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "sass:list";@use "~@/assets/scss/public/variables.scss" as *;`,
        sassOptions: {
          outputStyle: 'expanded',
        },
      },
    },
  },
  transpileDependencies: true,
})
