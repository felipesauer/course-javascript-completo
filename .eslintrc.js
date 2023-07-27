module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      plugins: ["@html-eslint"],
      rules: {},
    },
    {
      files: ["*.js"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: [],
      rules: {},
    },
    {
      files: ["*.css"],
      plugins: ["stylelint"],
      extends: ["stylelint-config-recommended"],
      rules: {},
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {},
};
