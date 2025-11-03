
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        'tutorial/1-make-peripheral',
        'tutorial/2-connect-core', 
        'tutorial/3-connect-claude'
      ],
      collapsed: false
    },
  ]
};

module.exports = sidebars;


module.exports = sidebars;
