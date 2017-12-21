exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.loader('raw', {
        use: 'raw-loader',
      });

      break;

    case 'build-css':
      config.loader('raw', {
        use: 'raw-loader',
      });

      break;

    case 'build-html':
      config.loader('raw', {
        use: 'raw-loader',
      });

      break;

    case 'build-javascript':
      config.loader('raw', {
        use: 'raw-loader',
      });

      break;
  }

  config.loader('sass', function(cfg) {
      cfg.test = /\.scss$/;
      cfg.loader = 'style!css!scss';
      return cfg;
  });

  return config;
}

module.exports = {
  siteMetadata: {
    title: 'React Components for Teams That Move Fast | Possum',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
  ],
}
