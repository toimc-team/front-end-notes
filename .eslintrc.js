module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'standard', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['vue'],
  rules: {}
}
