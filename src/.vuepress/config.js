const { resolve, genSidebarConfig } = require('./utils/index')
const { description } = require('../../package')

const siderBarOptions = { hasSub: true, exclude: ['README.md', 'assets', '.DS_Store', 'docs', 'images'] }

const nav = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '基础强化',
    items: [
      {
        text: '环境搭建',
        items: [
          {
            text: 'Vue',
            link: '/basic/vue/'
          },
          {
            text: 'Node.js',
            link: '/basic/node/'
          },
          {
            text: '调试技巧',
            link: '/basic/debug/'
          },
          {
            text: 'Docker',
            link: '/basic/docker/'
          }
        ]
      },
      {
        text: '语言基础',
        items: [
          {
            text: 'TypeScript',
            link: '/basic/ts/'
          },
          {
            text: 'Dart',
            link: '/basic/dart/'
          }
        ]
      },
      {
        text: '数据库',
        items: [
          {
            text: 'NoSQL',
            link: '/basic/nosql/'
          },
          {
            text: 'mongoDB',
            link: '/basic/mongo/'
          },
          {
            text: 'Redis',
            link: '/basic/redis/'
          }
        ]
      }
    ]
  },
  {
    text: 'DevOps',
    items: [
      {
        text: '效率工具',
        items: [
          {
            text: 'Jenkins',
            link: '/devops/jenkins/'
          }
        ]
      },
      {
        text: '团队协同',
        items: [
          {
            text: 'gitlab',
            link: '/devops/gitlab/'
          },
          {
            text: 'showDoc',
            link: '/devops/showdoc/'
          },
          {
            text: 'DOClever',
            link: '/devops/doclever/'
          }
        ]
      },
      {
        text: '容器化',
        items: [
          {
            text: 'Docker进阶',
            link: '/devops/docker-advance/'
          },
          {
            text: 'Kubernetes',
            link: '/devops/k8s/'
          }
        ]
      }
    ]
  },
  {
    text: '全端项目',
    items: [
      {
        text: '社区项目',
        items: [
          {
            text: '社区PC',
            link: '/project/community-pc/'
          },
          {
            text: '管理后台',
            link: '/project/community-admin/'
          },
          {
            text: 'WebApp',
            link: '/project/community-webapp/'
          }
        ]
      },
      {
        text: '多平台+跨端',
        items: [
          {
            text: '微信小程序',
            link: '/project/community-miniapp/'
          },
          {
            text: 'Flutter 2.0',
            link: '/project/community-flutter/'
          },
          {
            text: 'Electron桌面端',
            link: '/project/community-electron/'
          }
        ]
      },
      {
        text: 'React世界',
        items: [
          {
            text: 'React',
            link: '/project/react/'
          }
        ]
      }
    ]
  },
  {
    text: '前端面试',
    items: [
      {
        text: '笔试',
        items: [
          {
            text: '分类笔试题',
            link: '/interview/types/'
          },
          {
            text: '笔记技巧',
            link: '/interview/techs/'
          }
        ]
      },
      {
        text: '面试技巧',
        items: [
          {
            text: '技术面',
            link: '/interview/basic/'
          },
          {
            text: '项目面',
            link: '/interview/projects/'
          },
          {
            text: 'BOSS面',
            link: '/interview/boss/'
          },
          {
            text: 'HR面',
            link: '/interview/hr/'
          }
        ]
      },
      {
        text: '简历',
        items: [
          {
            text: '写好简历',
            link: '/interview/writor/'
          },
          {
            text: '简历模板',
            link: '/interview/templates/'
          }
        ]
      },
      {
        text: '公司行业',
        items: [
          {
            text: '选择公司',
            link: '/interview/company/'
          },
          {
            text: '行业洞悉',
            link: '/interview/industry/'
          }
        ]
      }
    ]
  },
  {
    text: '更新日志',
    link: '/update-logs/'
  }
]

const sidebar = {
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
    nav: nav,
    sidebar: sidebar
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/nprogress'
    // '@snowdog/vuepress-plugin-pdf-export'
  ]
}
