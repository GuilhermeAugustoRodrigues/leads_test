// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // options...
  devServer: {
    disableHostCheck: true,
    port: process.env.PORT || 8080,
    open: true,
    public: 'localhost:8081',
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://server:3000' ,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    }
  },
}
