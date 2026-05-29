import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Dev scripts are not part of the app bundle
    "scripts/**",
    // Data merge/build utilities — Node CJS scripts, not app code
    "src/data/**/*.js",
    // One-off root-level utility scripts (CJS, not app code)
    "fix-pl-quotes.js",
  ]),
  {
    rules: {
      // These patterns are used intentionally throughout the codebase (reading
      // localStorage in useEffect to avoid hydration mismatches, useRef(Date.now())
      // for mount-time timestamps). Downgrade to warn so CI can catch new violations
      // without breaking on pre-existing ones.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      // Variables/params prefixed with _ are intentionally unused (convention).
      "@typescript-eslint/no-unused-vars": ["error", {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }],
    },
  },
]);

export default eslintConfig;
