module.exports = {
  root: true,
  env: {browser: true, es2020: true, node: true},

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    'plugin:import/warnings',
    "react-app",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
 
  parserOptions: {ecmaVersion: "latest", sourceType: "module"},
  settings: {react: {version: "18.2"}},
  plugins: ["react-refresh"],
  
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {allowConstantExport: true},
    ],

    "no-unused-vars": "off",
    "react/prop-types": "off",
    "no-restricted-globals": "off",
  },
};
