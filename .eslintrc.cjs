module.exports = {
  /* ---------------------------------------------------------------- env */
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  /* ------------------------------------------------------------ parser */
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Uncomment if you want full type-aware rules
    // project: './tsconfig.json',
  },

  /* ----------------------------------------------------------- plugins */
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
  ],

  /* ----------------------------------------------------------- extends */
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // ← enable if you set parserOptions.project
    'prettier', // keep Prettier last
  ],

  /* --------------------------------------------------------- settings */
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      // so `import … from "@/components/Button"` resolves
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      typescript: {}, // uses tsconfig paths
    },
  },

  /* --------------------------------------------------------- overrides */
  overrides: [
    // Node-side scripts & config files
    {
      files: [
        '*.config.{js,cjs,mjs}',
        'vite.config.{js,ts}',
        'tailwind.config.{js,ts}',
        'scripts/**',
      ],
      env: { node: true },
      rules: {
        'no-console': 'off',
      },
    },
    // Test files (example with Vitest/Jest)
    {
      files: ['**/*.test.{ts,tsx}'],
      env: { jest: true },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};