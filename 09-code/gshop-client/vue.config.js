module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.92.128.115/', // 目标位置
        changeOrigin: true // 是否跨域
        // 把/api开头的字符串路径重新的干掉
        // pathRewrite: {
        //   '^/api': ''  // 重置为空
        // }
      }
    }
  }
}