module.exports = {
  extends: ['algolia', 'plugin:flowtype/recommended'],
  plugins: ['flowtype'],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/no-string-refs": 0,
    "prettier/prettier": ['error', { trailingComma: 'es5', singleQuote: true, printWidth: 100 }]
  }
}

