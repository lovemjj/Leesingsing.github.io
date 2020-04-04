module.exports = {
  publicPath: '',
  outputDir: 'naughty-kid',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.233.137.52:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    port: '8083'
  }
}
