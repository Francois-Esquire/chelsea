const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin([
      'APP_URL',
      'CDN_URL',
    ]),
  ],
};
