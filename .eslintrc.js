module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'jest'
  ],
  rules: {
    // Special ESLint rules or overrides
    'comma-dangle': ['error', "only-multiline"]
  }
}
