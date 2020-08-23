module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/display-name': [
      'error',
      {
        ignoreTranspilerName: false
      }
    ],
    'comma-dangle': ['error', 'never'],
    'react/prop-types': [0]
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ]
}
