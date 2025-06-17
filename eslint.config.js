// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: ['node_modules/**'],
    },
    {
        files: ['src/js/**/*.js', 'src/js/**/*.jsx'],
        plugins: {
            react: reactPlugin,
        },
        languageOptions: {
            globals: { ...globals.browser },
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            semi: ['error', 'always'],
            // add other rules here
        }
    }
]);
