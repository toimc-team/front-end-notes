---
sidebar: auto
---

# 小程序uniapp

## 什么是uniapp?

`uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。



## 环境初始化

### 集成scss/sass编译

为了方便编写样式（例如`<style lang="scss">`），建议大家安装`sass/scss编译`插件，插件的下载地址：[scss/sass编译](https://ext.dcloud.net.cn/plugin?name=compile-node-sass)

![image-20210419163056984](./assets/image-20210419163056984.png)



登录账号 -> 无账号，即注册（邮箱验证） -> 再次点击安装插件 -> 打开HBuilderX



### 自定义主题、快捷键等

#### 1. 快捷键切换

在`工具 -> 预设快捷键方案切换` 中可以切换自己喜欢的快捷键方案，对HBuilderX进行自定义：

![image-20210419163655412](./assets/image-20210419163655412.png)

#### 2. 设置主题

![image-20210419163851076](./assets/image-20210419163851076.png)

#### 3. 字号设置

macOS的快捷键是 `Command + ,`，windows的快捷键是`Ctrl + ,`

![image-20210419164115182](./assets/image-20210419164115182.png)

常见配置：

```json
{
	"editor.colorScheme": "Monokai",
	"editor.fontSize": 14,
	"editor.fontFamily": "Consolas",
	"editor.insertSpaces": true,
	"editor.lineHeight": "1.5",
	"editor.mouseWheelZoom": true,
	"editor.onlyHighlightWord": false,
	"editor.tabSize": 2,
	"editor.wordWrap": true,
  //启用px转rem提示 true-开启，false-关闭
  "editor.codeassist.px2rem.enabel": false,
  //启用px转upx提示, uni-app项目生效 true-生效， false-关闭
  "editor.codeassist.px2upx.enabel": false
}
```



### 使用HBuilderX可视化界面

步骤：

- 下载HBuilderX：[官方IDE下载地址](https://www.dcloud.io/hbuilderx.html) ——建议使用标准版本

  > HBuilderX标准版可直接用于web开发、markdown、字处理场景。做App仍需要安装插件。
  >
  > App开发版预置了App/uni-app开发所需的插件，开箱即用。
  >
  > 标准版也可以在插件安装界面安装App开发所需插件，App开发版只是一个预集成作用。
  >
  > App开发插件体积大的原因主要有2方面：
  >
  > 1. 真机运行基座，Android版、iOS版、iOS模拟器版，加起来体积就1百多M。真机运行基座需要把所有模块都内置进去，方便大家开发调试。开发者自己做app打包是不会这么大的，因为可以在manifest里选模块来控制体积。
  > 2. uni-app的编译器，依赖webpack和各种node模块，node_modules就是这么一个生态现状，文件超级多，几万个文件，解压起来很慢。

- 在点击工具栏里的文件 -> 新建 -> 项目：

  ![img](./assets/b925a1c0-4f19-11eb-97b7-0dc4655d6e68.png)

 - 选择`uni-app`类型，输入工程名，选择模板，点击创建，即可成功创建。

   ![image-20210419161501579](./assets/image-20210419161501579.png)

- 在微信开发者工具里运行：进入hello-uniapp项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app。

  ​	![img](./assets/d89fd6f0-4f1a-11eb-97b7-0dc4655d6e68.png)

  第一次运行的提示：

  ![image-20210419170249359](./assets/image-20210419170249359.png)

  成功运行：

  ![image-20210419170454810](./assets/image-20210419170454810.png)

  

  

  **注意：**

  - 如果是第一次使用，需要先配置小程序ide的相关路径，才能运行成功。如下图，需在输入框输入微信开发者工具的安装路径，uni-app默认把项目编译到根目录的unpackage目录。

    ![image-20210419171415089](./assets/image-20210419171415089.png)

  - 若HBuilderX不能正常启动微信开发者工具，需要开发者手动启动，然后将uni-app生成小程序工程的路径拷贝到微信开发者工具里面，在HBuilderX里面开发，在微信开发者工具里面就可看到实时的效果。

  - 如果提示`[error] 工具的服务端口已关闭。要使用命令行调用工具，请在下方输入 y 以确认开启，或手动打开工具 -> 设置 -> 安全设置，将服务端口开启`，如图：

    ![image-20210419170330616](./assets/image-20210419170330616.png)

    微信开发者工具设置菜单，安全中打开服务端口：

    ![image-20210419165932479](./assets/image-20210419165932479.png)

  

### 使用vue-cli命令行(VSCode)

1. 初始化项目

```
// 全局安装 vue-cli 3.x（如已安装请跳过此步骤）
npm install -g @vue/cli

// 通过 CLI 创建 uni-app 项目
vue create -p dcloudio/uni-preset-vue my-project
```

![img](./assets/1190eb9efa120f8db46d2aa81773a8a8.png)



2. 安装组件语法提示

组件语法提示是uni-app的亮点，其他框架很少能提供。

```
复制代码npm i @dcloudio/uni-helper-json
```



### 配置AppID

![image-20210419171015789](./assets/image-20210419171015789.png)



## 配置ESLint与代码格式化（仅VSCode）

### 初始化ESLint

```
# 初始化npm包管理
npm init -y

# 安装eslint依赖
npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-vue
```

package.json文件配置如下：

```json
  "devDependencies": {
    "eslint": "^7.24.0",
    "eslint-config-standard": "^16.0.2",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.3.1",
    "eslint-plugin-vue": "^7.8.0"
  }
```

新建 两个文件，`.eslintrc.js`：

```js
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'standard', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['vue'],
  rules: {
    // 这里有一些自定义配置
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error']
      }
    ],
    'no-eval': 'error',
    'no-alert': 'error'
  },
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly'
  }
}
```

创建`.eslintignore`文件：

```
node_modules
.hbuilderx
static
uni_modules
unpackage
```



### 配置vscode自动修复功能

安装`vetur`、`eslint`插件

打开vscode的首选项配置，`settings.json`文件

```
{
  // ... 你自己的配置
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  //autoFix默认开启，只需输入字符串数组即可
  "eslint.validate": ["javascript", "vue", "html"],

  // 关闭vue文件的自动格式化工具, vetur，使用eslint
  "[vue]": {
  	"editor.defaultFormatter": "octref.vetur"
  },

  "vetur.format.defaultFormatter.ts": "none",
  "vetur.format.defaultFormatter.js": "none",

  // ... 
}
```



### 下载官方代码提示

点击 [下载地址](https://github.com/zhetengbiji/uniapp-snippets-vscode)，放到项目目录下的 .vscode 目录即可拥有和 HBuilderX 一样的代码块。

![img](./assets/d39d378c0821a67c8bf72c7965833378.png)



## 首页列表

创建页面

![image-20210419173303417](./assets/image-20210419173303417.png)







## 搜索功能



## 文章详情



## 代码高亮



## 登录授权&个人信息获取



## 个人中心



## HTTPS



## 订阅消息



## 内容安全