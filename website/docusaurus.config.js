/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // Docs folder path relative to website dir.
          path: 'en',
          editUrl: 'https://github.com/centreon/centreon-documentation/edit/master/en/',
          routeBasePath: '/',
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.json'),
        },
        // ...
      },
    ],
  ],
  title: 'Centreon documentation', // Title for your website.
  tagline: '',
  url: 'https://www.centreon.com', // Your website URL
  baseUrl: '/@BASEURL@/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'centreon-documentation',
  organizationName: 'centreon',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  themeConfig: {
    navbar: {
      title: 'Centreon',
      logo: {
        alt: 'Centreon Logo',
        src: 'img/logo-centreon.png',
      },
      items: [
        {to: 'getting-started/installation-first-steps', label: 'Documentation', position: 'left'},
      ],
    },
    // Algolia search field
    algolia: {
      apiKey: '2c8912e81dc56e382c3964f26634e056',
      indexName: 'centreon',
      algoliaOptions: {} // Optional, if provided by Algolia
    },
    googleAnalytics: {
      trackingID: 'UA-8418698-13',
    },
  },
  favicon: 'img/logo-centreon.png',

  /* Colors for website */
  /*
  colors: {
    primaryColor: '#23303A',
    secondaryColor: '#10069F',
    bgLightBlue: 'rgba(0, 159, 223, 0.1)',
    fontColor: 'rgba(34, 46, 59, 1)',
    fontLinkColor: 'rgb(0, 114, 206)',
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  //copyright: `Copyright © 2005 - ${new Date().getFullYear()} Centreon`,

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    '/@BASEURL@/js/buttons.js',
    '/@BASEURL@/js/clipboard.min.js',
    '/@BASEURL@/js/code-block-button.js',
    '/@BASEURL@/js/languages-select.js',
    '/@BASEURL@/js/versions-select.js',
    '/@BASEURL@/js/lightbox-centreon.js',
  ],
};

module.exports = siteConfig;
