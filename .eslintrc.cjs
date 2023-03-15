module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './packages/*/tsconfig.json',
      },
      node: false,
    },
  },
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // disable lots of formatter related rules
    'class-methods-use-this': 0,
    'function-paren-newline': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/indent': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 0,
    'react/jsx-closing-tag-location': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
  },
  root: true,
};
