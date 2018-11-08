const path = require('path');
const TodoWebpackPlugin = require('./index');

const config = {
  entry: './test_app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new TodoWebpackPlugin({ console: true })]
};

module.exports = config;
