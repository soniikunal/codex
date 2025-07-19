import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // rules: {
    //   // ❌ Turn off unused var errors (warn instead)
    //   "@typescript-eslint/no-unused-vars": [
    //     "warn",
    //     { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    //   ],

    //   // ❌ Allow 'any' temporarily (warn instead of error)
    //   "@typescript-eslint/no-explicit-any": "warn",

    //   // ✅ Prefer primitive types (warn instead of error)
    //   "@typescript-eslint/no-wrapper-object-types": "warn",

    //   // ✅ Warn on missing dependencies in useEffect
    //   "react-hooks/exhaustive-deps": "warn",

    //   // ❌ Allow <img> usage (warn instead of error)
    //   "@next/next/no-img-element": "warn",

    //   // NEW: allow unescaped apostrophes in JSX
    //   "react/no-unescaped-entities": "warn",

    //   // NEW: allow using <a> instead of <Link>
    //   "@next/next/no-html-link-for-pages": "warn",
    // },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
