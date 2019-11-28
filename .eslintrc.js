module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  },
  extends: ["airbnb"],
  plugins: ["react-hooks"],
  rules: {
    'react/jsx-props-no-spreading': ['off'],
    'no-alert': ['off']
  }
};
