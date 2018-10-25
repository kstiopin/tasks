module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react-app']
      }
    }, {
      test: /\.(less)$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    }]
  },
  mode: 'production',
  performance: {
    hints: false
  }
};