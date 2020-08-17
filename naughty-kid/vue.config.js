let proxyTarget = process.env['PROXY_TARGET'] || 'http://49.233.137.52:8080'
// const proxyTarget = 'http://localhost'

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '熊孩子推拿',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  publicPath: '',
  outputDir: 'naughty-kid',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/img': {
        target: proxyTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/img': '/img'
        }
      }
    },
    port: '8083'
  }
}
