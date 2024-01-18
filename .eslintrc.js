module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    "@angular-eslint/eslint-plugin",
    "@typescript-eslint"
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Add your project-specific rules here
  },
};
