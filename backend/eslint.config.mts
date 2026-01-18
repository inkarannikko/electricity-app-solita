import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], rules: {"semi": ["error"], "quotes": ["error", "double"], // enforce double quotes
      "no-unused-vars": ["warn"],
      "eqeqeq": ["error", "always"],
      "no-console": ["warn"],
      "indent": ["error", "tab"], },
 languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
]);
