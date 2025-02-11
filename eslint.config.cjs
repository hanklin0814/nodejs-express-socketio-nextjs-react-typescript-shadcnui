//使用 eslint.config.cjs 的副檔名（讓 node 視該檔案為 CommonJS）
const globals = require('globals');
const pluginJs = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    ignores: ['**/*.md', 'node_modules/', 'yarn.lock'],
    rules: {
      // 根據需求客製化規則
    },
  },
  pluginJs.configs.recommended,
];
