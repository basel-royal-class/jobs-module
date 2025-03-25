// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       ecmaVersion: 2022, // Updated from 5 to modern JS
//       sourceType: 'module',
//       parserOptions: {
//         project: './tsconfig.json',
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       // NestJS friendly rules
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       '@typescript-eslint/explicit-module-boundary-types': 'warn',
//       '@typescript-eslint/no-unused-vars': ['warn', { 
//         'argsIgnorePattern': '^_',
//         'varsIgnorePattern': '^_' 
//       }],
//       'prettier/prettier': ['error', {
//         'endOfLine': 'lf', // Force LF (Unix-style) line endings
//         'singleQuote': true,
//         'trailingComma': 'all',
//         'printWidth': 100,
//         'tabWidth': 2,
//         'useTabs': false, // Explicitly use spaces instead of tabs
//         'semi': true, // Always use semicolons 
//         'bracketSpacing': true
//       }]
//     },
//   },
// );