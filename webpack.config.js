// webpack configuration
const dependencies = ['webpack', 'path', 'copy-webpack-plugin', 'html-webpack-plugin', 'webpack-bundle-analyzer'];
const include = deps => deps.map(dep => require(dep));

const activate_hmr = (webpack, config) => {
  config.entry['hot-module'] = 'react-hot-loader/patch';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer['hot'] = true;
}

// webpack config
module.exports = env => ((function(webpack, path, CopyPlugin, HtmlPlugin, Analyzer) {

  const resolve = directory => path.resolve(__dirname, directory)
  const config = {

    mode: "development",

    entry: {
      polyfill: 'babel-polyfill', // to include async/ await
      app: resolve('src/index.js'),
    },

    output: {
      path: resolve('dist/'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },

    resolve: {
      alias: {
        client_config: resolve('config/app.json'),
        components: resolve('src/components/'),
        services: resolve('src/services/'),
        types: resolve('src/types'),
        assets: resolve('src/assets/')
      },
      extensions: ['*', '.js', '.jsx', ".ts", ".tsx"],
    },

    module: {

      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        },
        {
          test: '/\.(html)$/',
          use: ['raw']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: ['file-loader']
        }
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        CLIENT_CONFIG: 'client_config',
        STYLES: 'styles',
      }),
      new CopyPlugin([{ from: 'src/favicon.png', to: 'dist/' }]), // copy top-level independent favicon to served src/
      new HtmlPlugin({ template: resolve('src/index.html'), inject: 'body' }),
      new Analyzer.BundleAnalyzerPlugin({ analyzerPort: 9998 }) // bundle chunks visualizer
    ],

  };

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: resolve('dist/'),
    compress: true,
    allowedHosts: ['localhost'],
    port: 8765,
    historyApiFallback: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  if (env && env.hot) activate_hmr(webpack, config);

  console.log('WEBPACK CONFIG', config)

  return config;
})(...include(dependencies)));