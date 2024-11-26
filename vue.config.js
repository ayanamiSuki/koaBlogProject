const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 23330,
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
      '/uploads': {
        target: 'http://123.207.64.4',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  //webpack部分配置
  chainWebpack: (config) => {
    config.resolve.alias.set('assets', resolve('src/assets')).set('@', resolve('src'))
    // const externals = {
    //   '@wangeditor/editor-for-vue': 'WangEditorForVue',
    // }
    // config.externals(externals)
    // #endregion
  },
  configureWebpack: (config) => {
    const plugins = [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        statsOptions: { source: false },
      }),
    ]
    return {
      plugins,
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "sass:list";@use "~@/assets/scss/public/variables.scss" as *;`,
        sassOptions: {
          outputStyle: 'expanded',
        },
      },
      postcss: {
        postcssOptions: {
          plugins: [require('autoprefixer')],
        },
      },
    },
  },
  transpileDependencies: true,
})
