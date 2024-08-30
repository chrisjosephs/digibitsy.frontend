module.exports = {
  siteMetadata: {
    title: `Digibitsy | Digibitsymicronanocyberweb LTD`,
    description: `Digibitsy Portfolio`,
    author: `@gatsbyjs`,
  },
  siteMetadata: {
    // add general title and description
    title: `Digibitsy | Digibitsymicronanocyberweb LTD`,
    description: `Digibitsy Portfolio`,
    author: `@christopherjosephs`,
    // site URL, no trailing slash
    siteUrl: 'https://alpha.digibitsymicronanocyberweb.com',
    // other default open graph data
    og: {
      siteName: `Digibitsy | Digibitsymicronanocyberweb LTD`,
    },
    social: {
      linkedin: "https://www.linkedin.com/in/christopher-josephs",
      github: "xiss23@gmail.com",
      email: "digbitsy@gmail.com",
    },
  },
  plugins: [
    'gatsby-plugin-typegen',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-remark-images',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Orbitron\:900, 400`,
          `Yellowtail\:400`,
        ],
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the
                                            // root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    // this (optional) plugin enables Progressive Web App + Offline
    // functionality To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
