import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  // Base configs that do not require type information.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // --- TYPE-AWARE CONFIGURATION ---
  // This is the most important block. It is specifically for files
  // that should be linted with type information.
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Apply the type-checked rules.
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        // THIS IS THE CRITICAL FIX: Use projectService for project references.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // EXPLICIT RULE OVERRIDE: To prevent the 'allowShortCircuit' error,
      // we explicitly disable the base rule and configure the TS version.
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      // Your other custom rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // --- REACT-SPECIFIC CONFIGURATION ---
  {
    files: ['**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // --- NODE / CONFIG FILE IGNORES ---
  // This block disables type-aware linting for JS configuration files.
  {
    files: ['*.js', '*.mjs', '*.cjs', '*.config.js', 'scripts/**'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-console': 'off',
    },
  },
);
