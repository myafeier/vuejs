module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:9061',
          changeOrigin: true
        },
      }
    }
  }