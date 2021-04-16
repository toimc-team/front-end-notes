# 大前端学习笔记

[WIP]



## 介绍

本仓库是慕课网[大前端](https://class.imooc.com/sale/webfullstack)课程笔记，重点是视频学习的辅助资料（扩展资料）。

同步github pages：[地址](https://toimc-team.github.io/notes-page/)

同步gitee + gitee pages：[地址](https://toimc.gitee.io/notes-page)



## 项目开发

```
git clone git@github.com:toimc/front-end-notes.git

cd front-end-notes

npm i

npm run dev
```

访问本地的localhost:8080，即可以访问文档。



## 工作目录

```
.
├── .eslintignore
├── .eslintrc.js
├── .github
│   └── workflows      // github actions
│       ├── master.yml // 同步gitee pages
│       └── sync.yml   // 同步gitee
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── LICENSE            // 开源协议
├── README.md
├── deploy.sh          // 本地部署脚本
├── package-lock.json
├── package.json
└── src
    ├── .vuepress      // vuepress框架配置
    │   ├── config.js  // 导航、侧栏配置
    │   ├── dist
    │   ├── enhanceApp.js
    │   └── styles     // 全局样式
    ├── about          // 关于页面
    │   └── README.md
    ├── index.md       // 首页
    ├── interview      // 面试技巧
    │   └── README.md
    ├── project        // 项目
    │   ├── miniapp
    │   └── react
    └── update-logs    // 更新日志
        └── README.md
```



## 参与贡献

[WIP]