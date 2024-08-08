import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  {ignores: [".github/*", "dist/", "dist/*", "assets/", "**/cypress/", "**/e2e/", "**/support/"]},
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...compat.extends('standard'),
  ...pluginVue.configs['flat/essential']
]
