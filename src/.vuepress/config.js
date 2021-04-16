const path = require('path')
const fs = require('fs')

const resolve = (src) => path.join(__dirname, '../../', src)
const { description } = require('../../package')

const genSidebarConfig = (dir, { hasSub, exclude }) => {
  const p = path.join(__dirname, '../', dir)
  const files = fs.readdirSync(p)
  const subDir = hasSub ? dir.split('/')[1] : ''
  const arr = []
  files.forEach(item => {
    if (exclude.indexOf(item) !== -1) return
    item = subDir ? subDir + '/' + path.basename(item, '.md') : path.basename(item, '.md')
    arr.push(item)
  })
  // console.log('🚀 ~ file: config.js ~ line 26 ~ genSidebarConfig ~ subDir', subDir)
  arr.unshift(subDir + '/')
  return arr
}

const siderBarOptions = { hasSub: true, exclude: ['README.md', 'assets', '.DS_Store', 'docs'] }

// console.log(genSidebarConfig('project/hrsaas', siderBarOptions))
// console.log(process.env.ITCAST === 'gitee' ? '/docs' : '/')
// console.log(process.env.NODE_ENV)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@static': resolve('./static')
      }
    }
  },
  base: process.env.NODE_ENV === 'development' ? '/' : '/notes-page/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '大前端 - 前端高级进阶',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '大前端',
        ariaLabel: '<test></test>',
        items: [
          {
            text: '项目开发',
            items: [
              {
                text: '小程序',
                link: '/project/miniapp/'
              },
              {
                text: 'React',
                link: '/project/react/'
              }
            ]
          }
        ]
      },
      {
        text: '更新日志',
        link: '/update-logs/'
      }
    ],
    sidebar: {
      '/project/': [
        {
          title: '小程序',
          collapsable: false,
          children: genSidebarConfig('project/miniapp', siderBarOptions)
        },
        {
          title: 'React',
          collapsable: false,
          children: [
            'react/'
          ]
        }
      ],
      '/': [
        {
          title: '首页',
          collapsable: false
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/nprogress',
    '@snowdog/vuepress-plugin-pdf-export'
  ]
}
