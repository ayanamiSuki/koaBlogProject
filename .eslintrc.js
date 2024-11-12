module.exports = {
  root: true,
  env: {
      node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
      parser: '@babel/eslint-parser',
  },
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      'vue/require-prop-type-constructor': 'off',
      'vue/no-mutating-props': 'off',
      'vue/multi-word-component-names': 'off',
      'no-unused-expressions': 'off',
      'vue/no-useless-template-attributes': 'off',
  },
}
