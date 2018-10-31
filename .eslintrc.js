module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": ["error", {
      allow: ['log']
    }],
    "no-multi-spaces": ["off", {
      exceptions: {
        "ImportDeclaration": true,
        "VariableDeclarator": true,
        "Property": true
      }
    }]
  }
};
