const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    library: 'ImagePaste',
    libraryTarget: 'umd',
    filename: "image-paste.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [["es2015", { "modules": false }]],
            "plugins": ["babel-plugin-transform-class-properties"]
          }
        }]
      }
    ]
  }
};
