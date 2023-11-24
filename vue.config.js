// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  outputDir: "../src/main/resources/static",
  devServer: {
    proxy: "http://localhost:8080",
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  // transpileDependencies: true
};
