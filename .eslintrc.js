module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    "browser": true,
  },
  "rules": {
    "max-len": ["error", 120],
    "object-curly-spacing": "off",
    "no-mixed-operators": "off",
    "arrow-parens": "off",
    "comma-dangle": [
      "error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore",
      }
    ],
  },
};
