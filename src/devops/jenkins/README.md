---
sidebar: auto
---

# Jenkins

## 什么是CI/CD
`CI/CD`即持续集成(Continuous Integration)、持续交付(Continuous Delivery)和持续部署(Continuous Deployment)，是一种通过引入自动化构建部署来频繁想客户交付的方法。看下图介绍了DevOps流程：

![](https://img-blog.csdnimg.cn/20210308203919800.png)

传统的项目构建部署都是人工操作的，本地测试、打包、上传到服务器部署、测试，然后发现bug、重现bug、修改bug、本地测试、再打包、上传到服务器部署。。。。。。如此循环。而自动化的出现正是解决这一重复的步骤，让繁琐重复的步骤交给脚本自动完成，自动化流程的意义：
- 减少人为失误，提高软件质量
- 效率迭代，便捷部署
- 快速交付，便于管理


**主流的自动化软件对比**
![](https://img-blog.csdnimg.cn/2021031614533474.png)

从上图可以看出主要的软件有Jenkins,Travis CI,Circle CI, 后面两个是云平台，而且只支持公有Public项目，私有项目需要付费；Jenkins支持本地化部署，而且免费，可高度配置，是开源CI&CD软件领导者， 提供超过1000个插件来支持构建、部署、自动化， 满足任何项目的需要。

## Jenkins 介绍

官网：[https://www.jenkins.io/](https://www.jenkins.io/)

Jenkins是一款开源 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。<br>
Jenkins 支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。

**Jenkins & Gitee 持续集成流程**

![](https://img-blog.csdnimg.cn/20210324230848552.png)

- 在本地编辑器编辑代码，提交到`Gitee`
- `git push` 操作触发 `Jenkins` 自动部署（`Jenkins` 安装在 `Docker` 中）
- `Jenkins` 开始构建、打包、最后部署到云服务器

## 安装Jenkins

### 系统要求

最低推荐配置:
- 256MB可用内存
- 1GB可用磁盘空间(作为一个Docker容器运行jenkins的话推荐10GB)

为小团队推荐的硬件配置:
- 1GB+可用内存
- 50 GB+ 可用磁盘空间

软件配置:
- Java 8—​无论是Java运行时环境（JRE）还是Java开发工具包（JDK）都可以。

> 注意：如果将Jenkins作为Docker 容器运行，这不是必需的

### 在Docker中下载并运行Jenkins

```bash
$ docker run --name jenkins_test -p 11005:8080 -p 50000:50000 jenkins/jenkins:lts
```

- --name 容器名称定义为jenkins_test
- -p 将本地11005端口映射到Jenkins容器中的8080端口，这是访问Jenkins网页的端口
- -p 50000端口映射是与Jenkins主服务器上通信的端口号

上面没有挂载 `volume`, 如果有必要可以使用 `-v` 来映射容器内部文件：
```bash
-v jenkins-data:/var/jenkins_home
```

安装完成后这里提示有个初始密码，第一次登录需要用到，也可以在`/var/jenkins_home/secrets/initialAdminPassword`找到，通过 `docker ps | grep jenkins` 查看 Jenkins 是否已开启，如果没有开启可以使用 `docker start jenkins` 来开启。

> ps: 注意添加本地的端口(11005)到防火墙，还有注意云主机也开放了此端口，否则不能访问哦。

在浏览器访问11005端口开始使用Jenkins：

![解锁Jenkins](https://img-blog.csdnimg.cn/20210323231948966.png)

![自定义Jenkins](https://img-blog.csdnimg.cn/20210323233652482.png)

![新手入门](https://img-blog.csdnimg.cn/20210323233844979.png)

![创建第一个管理员用户](https://img-blog.csdnimg.cn/20210323234333756.png)

![实例配置](https://img-blog.csdnimg.cn/20210323234459827.png)

![Jenkins已就绪](https://img-blog.csdnimg.cn/20210323234535102.png)

![开始使用](https://img-blog.csdnimg.cn/20210323234642602.png)


## 插件下载

### 配置国内加速源

在安装插件之前我们先配置下国内加速源，这样下载插件更快些。

首先打开[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)，搜索`jenkins`，选择 `update` 目录，复制该目录下的 `update-center.json` 的地址；

在`Jenkins`中打开Dashboard > 插件管理[Plugin Manager] > 高级[Advanced]：

![](https://img-blog.csdnimg.cn/20210324140129446.png)

找到升级站点[Update Site]的位置，将刚才复制的清华源地址放进去，点击【提交】，那么后面更新插件都是从这个源下载安装，速度比较快。

![](https://img-blog.csdnimg.cn/20210324140211437.png)


### 在线安装插件

在同一个目录的[可选插件] 选项卡，可以搜索没有安装的插件，勾选后点击下面的按钮即可安装（已经安装的插件只在[已安装]的选项卡）：

![](https://img-blog.csdnimg.cn/20210324154028414.png)


### 离线安装插件

若是本地环境或内网环境也可以使用离线安装的方式，可以去`Jenkins`的官网下载插件：[](https://plugins.jenkins.io/)

![](https://img-blog.csdnimg.cn/20210324140608399.png)

我们搜索一下 `Localization: Chinese` 然后就可以看到中文语言包：

![](https://img-blog.csdnimg.cn/20210324141203664.png)

点击版本号就开始下载了，得到了 `localization-zh-cn.hpi` 文件，然后来安装：

![](https://img-blog.csdnimg.cn/20210324141425368.png)

选择下载的文件，点击【上传】，安装完后，勾选【重启】，完事后就重新登录即可。


## 权限管理

权限管理的作用是给用户分配权限，首先我们来安装以下插件帮助我们管理安全配置：
- PAM Authentication plugin
- Matrix Authorization Strategy Plugin
- Role-based Authorization Strategy
- LDAP Plugin

安装完成重启Jenkins后生效。

### 基于角色安全管理

点击[系统管理] > [安全] > [全局安全配置] > [授权策略]，选择 `Role-Based Strategy`，然后保存，再回退到[系统管理] > [安全]，可以看到多出了一个菜单：

![](https://img-blog.csdnimg.cn/20210324155532109.png)

![](https://img-blog.csdnimg.cn/20210324155546563.png)

![](https://img-blog.csdnimg.cn/20210324155746639.png)

### 基于安全矩阵

在[授权策略]中选择`安全矩阵`，这个是基于用户的权限配置，这里需要注意的是需要吧管理员添加进来，如果没有添加是没有权限做任何事的，切记！！！

![](https://img-blog.csdnimg.cn/20210324160013818.png)


## 创建第一个完整的自动化项目
这里以`Gitee`作为代码仓库，也可以使用`Github`/`Gitlab`等仓库。

（假设已经安装好Jenkins）


### 创建git项目


### 安装Jenkins插件


**安装Gitee插件**

因为这里使用了`Gitee`，我们需要在`Jenkins`中安装Gitee插件：

![](https://img-blog.csdnimg.cn/20210324164001297.png)

> PS：安装完记得重启Jenkins。

**配置Gitee**

在[Jenkins] > [系统管理] > [系统配置] > [Gitee配置] 配置 `Gitee` 信息：

![](https://img-blog.csdnimg.cn/20210324164650789.png)

- 链接名：输入Gitee或随便输入你想要的名称
- Gitee域名URL：输入Gitee完整的URL地址 `https://gitee.com`
- 证书令牌：如没有添加需要新建一个，点击添加（如下图）

![](https://img-blog.csdnimg.cn/20210324170014881.png)

- Domain：选择全局凭据
- 类型：选择Gitee API令牌
- 范围：选择全局
- Gitee APIV5 私人令牌，[点击获取](https://gitee.com/profile/personal_access_tokens)
- ID 和 描述就随便写不一样的就行

添加完令牌就直接选择就行，然后点击【测试链接】，如果出现`成功`则表示配置正确：

![](https://img-blog.csdnimg.cn/20210324170446534.png)

**安装NodeJS**

因为我们的Vue项目是基于 `NodeJS` 来打包构建的，所以需要在 `Jenkins` 中安装插件：

![](https://img-blog.csdnimg.cn/20210324203031178.png)

**配置NodeJS**

在[系统管理] > [系统配置] > [全局工具配置] > [NodeJS] 点击【NodeJS安装】：

![](https://img-blog.csdnimg.cn/20210420210529926.png)

> PS: 建议 `NodeJS` 版本不要选太高，选最新的LTS版本即可。


### 新建构建任务

在 `Jenkins` 首页点击【新建任务】开始第一个流水线的构建，选择`构建一个自由风格的软件项目` 点击保存即可创建构建项目：

![](https://img-blog.csdnimg.cn/20210324170835154.png)

新建完成后进入配置，流水线会按照 [General] > [源码管理] > [构建触发器] > [构建环境] > [构建] > [构建后操作]的步骤来执行自动化任务。

#### General

![](https://img-blog.csdnimg.cn/20210324171712229.png)

#### 源码管理

- 选择 `Git` 选项
- Repository URL: 创建的git项目地址
- Credentials：点击添加一个凭据（注意 `Gitee API Token` 凭据不可用于源码管理的凭据，只用于`gitee`插件的 API 调用凭据）
- 点击【高级】 Advanced 按钮，Name输入`origin`，Refspec输入`+refs/heads/*:refs/remotes/origin/*`
- 指定分支：`master`

![](https://img-blog.csdnimg.cn/20210324194748464.png)

#### 触发器配置

这里选择配置 `push` 代码立即触发构建任务，勾选 `Gitee webhook触发构建`，后面有个地址这个后面需要配置到`Gitee`，`Gitee`触发构建策略勾选推送代码，其他先默认就行。

![](https://img-blog.csdnimg.cn/20210324193112270.png)

后面有个 `Gitee WebHook密码` 栏位需要配置到Gitee，点击生成就会生成一个密码：

![](https://img-blog.csdnimg.cn/20210324193145702.png)

打开 `Gitee` 项目的管理选项卡，左侧有个[WebHooks]菜单 ，点击【添加webHook】:

![](https://img-blog.csdnimg.cn/20210324193317281.png)

将上一步 `Jenkins` 生成的`URL`和`密码`填进去，点击【添加】：

![](https://img-blog.csdnimg.cn/20210324193430983.png)


#### 构建环境

修改构建任务的构建环境，勾选 `Provide Node & npm bin/ folder to PATH` ，默认会选择`Jenkins`安装的`NodeJS`版本:

![](https://img-blog.csdnimg.cn/20210420221323687.png)

#### 构建脚本

选择【执行shell】：
![](https://img-blog.csdnimg.cn/20210324200306648.png)

先随便写一个shell脚本试试：
![](https://img-blog.csdnimg.cn/2021032420025598.png)

保存后，触发一次提交，看看`控制台输出`：

![](https://img-blog.csdnimg.cn/20210324201532828.png)



### Vue项目构建及部署`

vue项目通过 `NodeJS` 构建后，需要将构建后的 `dist` 文件夹的内容部署到云服务器，因为 `Jenkins` 是 `Docker` 容器创建的，容器内部不能直接移动文件，因为没有挂载`volumn`，所以这里可以使用 `SSH` 的方式来传输容器的构建文件到`nginx`服务器。先来安装下`Publish over SSH`，进入插件管理：

![](https://img-blog.csdnimg.cn/20210325193332944.png)

安装完成后，在[系统管理] > [系统配置] 会多出一个`Publish over SSH`:

在云服务器生成密钥：
```bash
$ ssh-keygen -t rsa -C "xxxx@qq.com"
# 将公钥放到authorized_keys，否则SSH Server配置会不成功
$ cat id_rsa.pub >> authorized_keys
```

填写私钥：
![](https://img-blog.csdnimg.cn/20210406223639894.png)

设置服务器的信息：
![](https://img-blog.csdnimg.cn/2021040623530727.png)

点击 【Test Configuration】按钮，左侧显示 `Success` 即表示`SSH`可以连接成功。


构建步骤修改脚本：

![](https://img-blog.csdnimg.cn/2021040811374362.png)

先添加一个`Transfer Set `删除部署目录的文件，如`nginx`配置的文件目录为`/usr/share/nginx/flower_html/`：

![](https://img-blog.csdnimg.cn/20210407153217299.png)

再加一个 `Transfer Set` 传送文件到部署目录：

![](https://img-blog.csdnimg.cn/20210407153314897.png)

部署效果：

![](https://img-blog.csdnimg.cn/2021040811382869.png)

