---
sidebarDepth: 2
---

# Docker 安装

## linux 下安装

### CentOS

- 卸载旧版版的，若没有安装过则可以忽略：

  ```sh
  sudo yum remove docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-engine
  ```

- 安装依赖

  ```sh
  sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
  ```

- 添加安装源

  ```sh{3}
  sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
  ```

  如安装过慢，可尝试将上面第三行代码的地址换为国内的源，如 `http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`

- 开始安装 `docker-ce`
  
  ```sh{1}
  sudo yum install docker-ce docker-ce-cli containerd.io
  ```

  > 以上代码会安装最新的稳定版本，若需安装指定版本，只要将 `docker-ce docker-ce-cli` 替换为 `docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING>` 即可。
  >
  > `<VERSION_STRING>` 为版本号字符串，如安装 19.03.13 则代码为 `sudo yum install docker-ce-19.03.13 docker-ce-cli-19.03.13 containerd.io` 。

- 安装完成后即可进行测试

  ```sh
  # 启动 docker 
  sudo systemctl start docker
  # 通过运行hello-world 映像验证 Docker Engine 是否已正确安装。
  sudo docker run hello-world
  ```

- 其他

  ```sh
  # docker 更新
  yum -y update docker-ce docker-ce-cli containerd.io
  # docker 卸载
  sudo yum remove docker-ce && sudo rm -rf /var/lib/docker
  ```

### Debian

适用于64位的以下系统：

- Debian Bullseye 11 (testing)
- Debian Buster 10 (stable)
- Raspbian Bullseye 11 (testing)
- Raspbian Buster 10 (stable)

安装过程如下：

- 卸载旧版版的，若没有安装过则可以忽略：

  ```sh
  sudo apt-get remove docker docker-engine docker.io containerd runc
  ```

- 更新 apt 包索引

  ```sh
  sudo apt-get update
  ```

- 安装一些包以运行 `apt` 通过 https 仓库进行安装

  ```sh
  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
  ```

- 添加 docker 官方的 GPG key

```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

- 设置安装仓库，根据你机器的 cpu 架构择以下不同的代码执行即可

```sh
# x86_64 / amd64
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# armhf
echo \
  "deb [arch=armhf signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# arm64
echo \
  "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- 完成上面的步骤后，就可以通过 `apt` 开始安装 `docker-ce` 了
  
  ```sh
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```

  > 以上代码会安装最新的稳定版本，若需安装指定版本，只要将 `docker-ce docker-ce-cli` 替换为 `docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING>` 即可。
  >
  > `<VERSION_STRING>` 为版本号字符串，如安装 19.03.13 则代码为 `sudo apt-get install docker-ce-19.03.13 docker-ce-cli-19.03.13 containerd.io` 。

- 安装完成后即可进行测试

  ```sh
  # 启动 docker 服务
  $ sudo service docker start
  # 查看 docker 服务状态
  $ sudo service docker status
  # 通过运行hello-world 映像验证 Docker Engine 是否已正确安装。
  sudo docker run hello-world
  ```

- 其他

  ```sh
  # docker 卸载
  sudo apt-get purge docker-ce docker-ce-cli containerd.io
  sudo rm -rf /var/lib/docker
  sudo rm -rf /var/lib/containerd
  ```

### Ubuntu

适用于64位的以下系统：

- Debian Bullseye 11 (testing)
- Debian Buster 10 (stable)
- Raspbian Bullseye 11 (testing)
- Raspbian Buster 10 (stable)

安装过程如下：

- 卸载旧版版的，若没有安装过则可以忽略：

  ```sh
  sudo apt-get remove docker docker-engine docker.io containerd runc
  ```

- 更新 apt 包索引

  ```sh
  sudo apt-get update
  ```

- 安装一些包以运行 `apt` 通过 https 仓库进行安装

  ```sh
  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
  ```

- 添加 docker 官方的 GPG key

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

- 设置安装仓库，根据你机器的 cpu 架构择以下不同的代码执行即可

```sh
# x86_64 / amd64
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# armhf
echo \
  "deb [arch=armhf signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# arm64
echo \
  "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- 完成上面的步骤后，就可以通过 `apt` 开始安装 `docker-ce` 了
  
  ```sh
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```

  > 以上代码会安装最新的稳定版本，若需安装指定版本，只要将 `docker-ce docker-ce-cli` 替换为 `docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING>` 即可。
  >
  > `<VERSION_STRING>` 为版本号字符串，如安装 19.03.13 则代码为 `sudo apt-get install docker-ce-19.03.13 docker-ce-cli-19.03.13 containerd.io` 。

- 安装完成后即可进行测试

  ```sh
  # 启动 docker 服务
  $ sudo service docker start
  # 查看 docker 服务状态
  $ sudo service docker status
  # 通过运行hello-world 映像验证 Docker Engine 是否已正确安装。
  sudo docker run hello-world
  ```

- 其他

  ```sh
  # docker 卸载
  sudo apt-get purge docker-ce docker-ce-cli containerd.io
  sudo rm -rf /var/lib/docker
  sudo rm -rf /var/lib/containerd
  ```

::: tip
其他 linux 版本的安装可参考 [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
:::

## Mac OS 下安装

方式1，直接去官网下载dmg文件双击安装即可。 [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

方式2，使用 `brew` 安装

```sh
brew update
​brew cask install docker
```

## windows 下安装

windows 下安装需要windows 10 专业版企业版等。 从官网下载到 Docker Desktop 安装包，双击安装即可。 [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)

:::tip
如果你是windows 10 的家庭版，可以安装 wsl2 , 然后将 docker 安装到 wsl2 上。
wsl 是 Windows Subsystem for Linux 的简称， wsl2 是其第二个版本，安装方法参考微软官方文档即可[适用于 Linux 的 Windows 子系统安装指南](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)
:::

## 安装 docker-compose

docker-compose 是一个用于运行和管理多个 `docker` 容器的工具， 后文会有详细介绍。

在linux系统中安装 docker-compose 的方法如下：

```sh {2}
# 下载 docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose
```

若你的网络不好，上面代码下载过慢或者不成功时，可尝试将代码替换为上面的安装脚本替换为下面的代码：

```sh
sudo curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> windows 和 mac 安装 Docker Desktop 后自带 docker-compose 无需再次手动安装。
