import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

export default [
  { ignores: ['js', 'node_modules/**'] },
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  stylistic.configs['recommended-flat'],
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['*.tsx'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      // ... any rules you want
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        module: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        env: {
          es2023: true,
          browser: true,
          amd: true,
          node: true,
        },
        overrides: [
          {
            files: ['**/*.cjs'],
            env: {
              es2023: true,
              node: true,
            },
          },
        ],
      },
    },
  },
]
