#!/bin/bash

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd src/.vuepress/dist
# 初始化git
git init

# 配置git用户
git config user.name "brian"
git config user.email "brian@toimc.com"

git add -A
git commit -m 'update commit'

git remote add gitee git@gitee.com:toimc/docs.git
# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f gitee master

cd -

# npm run upload
