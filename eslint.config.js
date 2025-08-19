import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'],
    ignores: ['dist/**'],
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
    plugins: { js,'@stylistic/js': stylistic },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node } },
])
