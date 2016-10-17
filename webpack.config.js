module.exports = (config) => ({
  entry: __dirname + '/client',
  output: {
    path: __dirname + '/server/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(es6|jsx?)$/,
        loader: 'babel',
        include: [
          __dirname + '/client',
        ],
        exclude: [/node_modules/],
        query: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react',
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    alias: {
      app: __dirname + '/client'
    }
  },
})