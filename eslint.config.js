// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      semi: 'error',
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "info", "error"] }],
      "no-irregular-whitespace": ["error", { "skipRegExps": true }],
      "react-hooks/rules-of-hooks": "warn", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    },
  }
]);
