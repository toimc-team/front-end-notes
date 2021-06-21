const { path } = require('@vuepress/shared-utils')

// console.log('path', path.resolve(__dirname, '../'))

module.exports = (options) => ({
  alias: {
    // 添加自定义的路径设置
    '@': path.resolve(__dirname, '../')
  }
})
