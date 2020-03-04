module.exports = (() => {

  const autoprefixer       = require('autoprefixer');
  const path               = require('path');
  const extractTextPlugin  = require("extract-text-webpack-plugin");
  const webpack            = require('webpack');

  const query = {
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-react')
    ]
  };

  return {
    entry: './src/index.js',
    externals: [{
      "axios": {
        root: "axios",
        commonjs2: "axios",
        commonjs: "axios",
        amd: "axios"
      }
    },{
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },{
      "react-addons-css-transition-group": {
        root: "ReactCSSTransitionGroup",
        commonjs2: "react-addons-css-transition-group",
        commonjs: "react-addons-css-transition-group",
        amd: "react-addons-css-transition-group"
      }
    },{
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }],
    output: {
      filename: 'iws-form-component.js',
      library: 'IWSFormComponent',
      libraryTarget: 'umd',
      path: './dist/',
    },
    module: {
      loaders: [
        { test: /\.json(\?.*)?$/, loader: 'json' },
        { test: /\.jsx?(\?.*)?$/, loaders: [`babel?${ JSON.stringify(query) }`], exclude: /node_modules/ },
        { test: /\.scss(\?.*)?$/, loader: extractTextPlugin.extract('style', 'css!postcss!sass!import-glob-loader') },
        { test: /\.(jpe?g|png|gif)(\?.*)?$/i, loader: 'file?name=[name].[ext]!image-webpack?optimizationLevel=3' },
        { test: /\.svg(\?.*)?$/, loader: 'file?name=[name].[ext]' }
      ]
    },
    plugins: [
      new extractTextPlugin('iws-form-component.css'),
      new webpack.optimize.OccurenceOrderPlugin()
    ],
    postcss: () => [ autoprefixer ]
  };

})();
