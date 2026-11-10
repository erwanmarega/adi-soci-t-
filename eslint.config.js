import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'public']),
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ['**/*.{ts,vue,js}'],
    rules: {
      // TypeScript already reports undefined identifiers.
      'no-undef': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      // Formatting is handled by hand (no Prettier in this project): keep template rules to correctness only.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },
])
