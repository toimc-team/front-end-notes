---
sidebarDepth: 2
---

# 代码Commit规范

## 格式

Commit 规范采用常用的 [Angular](https://github.com/angular/angular) 团队所使用的规范，具体如下：

```
<type><scope>: <subject>
<空行>
<body>
<空行>
<footer>
```



### type 规则（必填）

type 代表本次 commit 的类型，有且仅有如下几种：

- **feat** - 功能性更新
- **fix** - bug 修复
- **style** - 改变代码格式（如删除空行、格式化代码、去除不必要的分号等等）
- **refactor** - 既不是功能更新也不是 bug 修复的更改（建议对代码进行重构的时候使用）
- **perf** - 代码改变提高了性能
- **test** - 添加测试用例或者修改测试用例
- **build** - 由打包工具造成的改变（如gulp、webpack编译文件）
- **chore** - 既不是源码的修改，也不是测试用例的修改（修改项目相关配置时可以使用）
- **revert** - 撤销之前的提交



### scope 规则（必填）

scope 代表本次 commit 的影响范围，暂定规则如下：

- 本次 commit 修改的**组件**
- 本次 commit 修改的**文件**
- 本次 commit 修改的**文件夹**

> 注意：
>
> - 选取时从上往下匹配
> - 组件名称应使用大写字母开头，多个单词每个单词都以大写开头
> - 文件名应包含完整后缀，如`index.js`、`.eslintrc.json`



### subject 规则（必填）

用一句简短的话描述本次修改的内容，**不要超过30个汉字**，**以动词开头**

建议选用如下动词：

- 新增（组件、属性、事件、API）
- 删除
- 修正
- 修复
- 修改

正确示例：

- 新增 Collapse 组件
- 新增 top 属性
- 删除 color 属性
- 修复 direction 属性不生效的问题
- 修正 column 属性拼写

> 注意：
>
> - subject 应该仔细斟酌，fix 和 feat 类型的 commit 的 subject 将会出现在更新日志中，
>
>   所以书写时应考虑这句话出现在更新日志中是否合适
>
> - subject 中不要包含组件名或者文件名，因为 scope 中已有对应名称



### body 规则（选填）

如果 subject 无法对本次 commit 进行清楚的阐释，则在 body 中进行补充说明。

建议填写以下内容：

- 为什么进行本次修改
- 本次修改了哪些内容
- 修改后的影响有哪些

> body 需要注意换行问题，不要写在一行不换行，建议在50个字以内进行断句换行。



### footer 规则（选填）

footer 中只填写两种内容：

1. 这次 commit 和某个 issue 相关联，提交后能关闭该 issue，则填写：

   ```
   close #748
   ```

   或者

   ```
   fix #745
   ```

2. 这次 commit 有不兼容上个版本的代码，则以`BREAKING CHANGE: `开头填写不兼容信息，如下：

   ```
   BREAKING CHANGE: Message组件top属性单位由px改为rpx
   ```



## 示例

一个**完整规范且正确**的 Commit 示例如下：

```
fix(NoticeBar)：修改top属性单位为rpx

NoticeBar组件的top属性单位之前为px，会出现无法自适应的问题。
更改为rpx后可对屏幕进行自适应。

BREAKING CHANGE: Notice-Bar组件top属性单位由px改为rpx

Close #745
```

> 推荐 commit 规范信息生成插件
>
> - WebStorm - [Git Commit Template](https://plugins.jetbrains.com/plugin/9861-git-commit-template)
> - Vs Code - [Commit Tagger](https://github.com/Mongkii/Commit-Tagger)



### 错误示例

1. `subject`描述中出现组件名称

   ```
   feat(Button): Button 组件新增 size 属性
   ```

   **因type（括号中的内容）已经指定了组件，所以 subject 描述信息中无需再指明组件**

2. 单词未添加空格

   ```
   feat(Button): 新增size属性
   ```

   **为了生成的 changelog 的可读性，所有的单词左右都需要添加一个空格**

3. feat、fix 类型需要慎重使用

   ```
   feat(Card): 更新 validator 校验器校验规则
   ```

   **因为 feat 和 fix 类型的 commit 信息会出现在 changelog 中，所以要保证这条信息是面向用户的。如上例所示，因为 validator 仅是我们自己内部使用，并不面向用户，所以用户并不关心这个校验器的新增功能。建议使用 chore 代替此处的 feat（chore 的意思是琐碎的事务）**



## 其他事项

一个 commit 应该是一个有意义的 commit

**有意义**的定义如下：

- 新增了一个功能或组件
- 修复了一个bug
- 解决了一个issue
- 重构了某个组件或文件
- 改善了现有代码的构建流程或风格

**无意义**的定义如下：

- 临时工作进度保存
- 误提交的 commit
- commit 信息不规范或缺失
- subject 无法准确描述此次 commit

> **注意**：一个 commit 的提交应该保证代码的可运行性和完整性。
>
> - 可运行性：commit 提交后，运行代码不能报错
> - 完整性：commit 提交后，当前代码中不能包含缺失的功能（如某个功能做了一半就提交）

