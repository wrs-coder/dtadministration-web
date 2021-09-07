module.exports = {
  runtimeCompiler: true,
  devServer: {
    // host: '0.0.0.0',
    hot: true, /* 开启热点 */
    inline: true, /* 开启页面自动刷新 */
    progress: true, /* 显示打包的进度 */
    disableHostCheck: true,
    // port:8080,
    open: true,
    watchOptions: {
      aggregateTimeout: 300
    },
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8078', /* 后台服务器地址 */
        hot: true,
        ws: false,
        changeOrigin: true
      }
    }
  }
}
