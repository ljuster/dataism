const _ = require('lodash/fp');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sassResources = require('./sassResources');

const clientStyleLoaders = extractCss => [
  {
    test: /\.css$/,
    use: [
      extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'postcss-loader',
    ],
  },
  {
    test: /^((?!\.global).)*\.scss$/,
    use: [
      extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: { resources: sassResources },
      },
    ],
  },
  {
    test: /\.global\.scss$/,
    use: [
      extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: false,
          importLoaders: 2,
        },
      },
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: { resources: sassResources },
      },
    ],
  },
];

const serverRenderingStyleLoaders = () => [
  {
    test: /\.css$/,
    use: {
      loader: 'css-loader/locals',
      options: {
        modules: true,
        importLoaders: 0,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      },
    },
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: { resources: sassResources },
      },
    ],
  },
];

function setModule(builderConfig, webpackConfig) {
  const webpackModule = {
    // Breaks SSR in production
    // noParse: [/\.min\.js$/],
    rules: [
      {
        test: /\.woff2?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            limit: 10000,
            publicPath: `/webpack/${process.env.NODE_ENV}/`,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            limit: 10000,
            publicPath: `/webpack/${process.env.NODE_ENV}/`,
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            publicPath: `/webpack/${process.env.NODE_ENV}/`,
          },
        },
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        use: {
          loader: 'imports-loader',
          options: { jQuery: 'jquery' },
        },
      },
      {
        test: /bootstrap\/assets\/javascripts\//,
        use: {
          loader: 'imports-loader',
          options: { jQuery: 'jquery' },
        },
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  };

  if (builderConfig.serverRendering) {
    webpackModule.rules.push(...serverRenderingStyleLoaders());
  } else {
    webpackModule.rules.push(...clientStyleLoaders(builderConfig.extractCss));
  }

  return _.set('module', webpackModule, webpackConfig);
}

module.exports = _.curry(setModule);
