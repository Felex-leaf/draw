const fs = require('fs');
const path = require('path');

const isTsProject = fs.existsSync(
  path.join(process.cwd() || '.', './tsconfig.json'),
);

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
    requireConfigFile: false,
    allowImportExportEverywhere: false,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  parser: '@babel/eslint-parser',
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    async: 'readonly', // 暂时在插件层面处理   no-undef错误-async
  },
  overrides: isTsProject
    ? [{
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
    }]
    : [],
};
