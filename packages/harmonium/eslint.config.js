import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'
import requireDocs from './eslint-rules/require-docs.js'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettierConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
  {
    // The generated LLM docs read this JSDoc (scripts/generate-llm-docs.ts).
    files: ['src/components/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}', '**/index.ts'],
    plugins: {harmonium: {rules: {'require-docs': requireDocs}}},
    rules: {'harmonium/require-docs': 'error'},
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.*'],
  },
)
