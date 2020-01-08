module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    gitDescribe: {
      variableName: "GIT_DESCRIBE"
    }
  }
};
