const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: "airbnb-base",
  env: {
    node: true
  },
  globals: {
    Promise: true
  },
  rules: {
    strict: OFF,
    "class-methods-use-this": OFF,
    "new-cap": OFF,
    "comma-dangle": OFF,
    "import/no-unresolved": OFF, // This is ind OFF because does not support rootPath
    camelcase: OFF,
    "no-unused-vars": OFF,
    "no-multi-assign": OFF,
    "no-restricted-syntax": WARN,
    "no-param-reassign": [WARN],
    "no-prototype-builtins": WARN,
    "max-len": ["error", 150],
    "space-unary-ops": [
      1,
      {
        words: true,
        nonwords: false,
        overrides: {
          new: false,
          "++": true
        }
      }
    ],
    "no-console": OFF,
    "no-plusplus": OFF,
    "arrow-parens": OFF,
    indent: [OFF, 4],
    semi: [ERROR, "always"]
  }
};
