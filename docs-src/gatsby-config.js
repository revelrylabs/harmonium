exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.loader('raw-loader', {
        use: 'raw-loader',
      });

      break;

    case 'build-css':
      config.loader('raw-loader', {
        use: 'raw-loader',
      });

      break;

    case 'build-html':
      config.loader('raw-loader', {
        use: 'raw-loader',
      });

      break;

    case 'build-javascript':
      config.loader('raw-loader', {
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
    title: 'React Components for Teams That Move Fast | Harmonium',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/harmonium-symbol.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
