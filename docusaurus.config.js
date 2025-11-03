// @ts-check
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PROJECT_SABA',
  tagline: 'Connect LLMs to Physical Hardware',
  url: 'http://localhost',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'kawaiiTaiga',
  projectName: 'project_SABA',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'BULLSHIT',
          blogDescription: 'Just for fun. Thoughts, rants, and random notes.',
          showReadingTime: true
          // no authors to avoid authors map issues
        },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'stuffs',
        path: path.resolve(__dirname, 'stuffs'),
        routeBasePath: 'stuffs',
        blogTitle: 'STUFFS',
        blogDescription: 'Real stuffs',
        showReadingTime: true,
        // no authors here either
        blogListComponent: require.resolve('./src/components/ExperimentsGridPage.jsx'),
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PROJECT_SABA',
        items: [
          { to: '/docs', label: 'DOCUMENT', position: 'right' },
          { to: '/stuffs', label: 'STUFFS', position: 'right' },
          { to: '/blog', label: 'BULLSHIT', position: 'right' }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contact',
            items: [
              { label: 'Email', href: 'mailto:gyeongmingim478@gmail.com' },
              { label: 'Instagram', href: 'https://instagram.com/gyeongmin116' }
            ]
          },
          {
            title: 'Legal',
            items: [
              { label: 'Apache License 2.0', href: 'https://www.apache.org/licenses/LICENSE-2.0' }
            ]
          }
        ],
        copyright: `© ${new Date().getFullYear()} PROJECT_SABA`
      }
    })
};

module.exports = config;
